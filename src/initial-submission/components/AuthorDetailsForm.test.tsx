import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import * as yup from 'yup';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import AuthorDetailsForm from './AuthorDetailsForm';
import { Submission } from '../types';
import { AuthorDetailsSchema } from '../utils/validationSchemas';

const nowISOString = new Date().toISOString();
const mutationMock = jest.fn();
const testInitialValues: Submission = { id: 'foo', updated: nowISOString, articleType: '' };

jest.mock('../hooks/useAutoSave', () => (cb: () => void, deps: DependencyList): void => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            cb();
        } else {
            initialRender.current = false;
        }
    }, deps);
});

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Joe Bloggs',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
            },
        };
    },
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
}));

const ButtonComponent = ({
    triggerValidation,
}: {
    _: Function;
    triggerValidation: () => Promise<boolean>;
}): JSX.Element => (
    <button
        onClick={(): void => {
            triggerValidation();
        }}
    >
        TEST BUTTON
    </button>
);

const initialValues: Submission = {
    author: {
        firstName: 'Joe',
        lastName: 'Blogs',
        email: 'joe@blogs.com',
        institution: 'somewhere',
    },
    id: 'foo',
    articleType: '',
    updated: nowISOString,
};

describe('Author Details Form', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(
                <AuthorDetailsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={initialValues}
                />,
            );
        }).not.toThrow();
    });

    it('should render correctly with all props', async (): Promise<void> => {
        expect(
            async (): Promise<void> => {
                render(
                    <AuthorDetailsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={initialValues}
                    />,
                );
            },
        ).not.toThrow();
    });
    it('should fill the correct boxes with author information when the text is clicked', async (): Promise<void> => {
        const { container, getByLabelText } = render(
            <AuthorDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={testInitialValues}
            />,
        );
        await fireEvent.click(container.querySelector('.typography__body--link'));
        expect((getByLabelText('author.author-first-name') as HTMLInputElement).value).toBe('Joe');
    });

    it('should display the correct values when an existing submission is passed in', async (): Promise<void> => {
        const initialValues: Submission = {
            author: {
                firstName: 'Joe',
                lastName: 'Blogs',
                email: 'joe@blogs.com',
                institution: 'somewhere',
            },
            id: '',
            articleType: '',
            updated: nowISOString,
        };
        const { getByLabelText } = render(
            <AuthorDetailsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={initialValues} />,
        );
        expect((getByLabelText('author.author-first-name') as HTMLInputElement).value).toBe('Joe');
        expect((getByLabelText('author.author-last-name') as HTMLInputElement).value).toBe('Blogs');
        expect((getByLabelText('author.author-email') as HTMLInputElement).value).toBe('joe@blogs.com');
        expect((getByLabelText('author.institution') as HTMLInputElement).value).toBe('somewhere');
    });
    describe('autosave', () => {
        it('when a first name is entered it triggers the autosave', () => {
            const { getByLabelText } = render(
                <AuthorDetailsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={testInitialValues}
                />,
            );

            fireEvent.input(getByLabelText('author.author-first-name'), {
                target: { value: 'test firstname' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'foo',
                    details: {
                        email: '',
                        firstName: 'test firstname',
                        institution: '',
                        lastName: '',
                    },
                },
            });
        });
        it('when a last name is entered it triggers the autosave', () => {
            const { getByLabelText } = render(
                <AuthorDetailsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={testInitialValues}
                />,
            );

            fireEvent.input(getByLabelText('author.author-last-name'), {
                target: { value: 'test lastname' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'foo',
                    details: {
                        email: '',
                        firstName: '',
                        institution: '',
                        lastName: 'test lastname',
                    },
                },
            });
        });
        it('when a email is entered it triggers the autosave', () => {
            const { getByLabelText } = render(
                <AuthorDetailsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={testInitialValues}
                />,
            );

            fireEvent.input(getByLabelText('author.author-email'), {
                target: { value: 'test@example.com' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'foo',
                    details: {
                        email: 'test@example.com',
                        firstName: '',
                        institution: '',
                        lastName: '',
                    },
                },
            });
        });
        it('when a email is entered it triggers the autosave', () => {
            const { getByLabelText } = render(
                <AuthorDetailsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={testInitialValues}
                />,
            );

            fireEvent.input(getByLabelText('author.institution'), {
                target: { value: 'test institution' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'foo',
                    details: {
                        email: '',
                        firstName: '',
                        institution: 'test institution',
                        lastName: '',
                    },
                },
            });
        });
    });
    describe('validation', () => {
        it('shows error if first name is empty', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: '',
                            lastName: 'Blogs',
                            email: 'joe@blogs.com',
                            institution: 'somewhere',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(1);
            expect(getByText('author.validation.first-name-required')).toBeInTheDocument();
        });
        it('shows error if last name is empty', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: 'Joe',
                            lastName: '',
                            email: 'joe@blogs.com',
                            institution: 'somewhere',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(1);
            expect(getByText('author.validation.last-name-required')).toBeInTheDocument();
        });
        it('shows error if email is empty', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: 'Joe',
                            lastName: 'Blogs',
                            email: '',
                            institution: 'somewhere',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(1);
            expect(getByText('author.validation.email-required')).toBeInTheDocument();
        });
        it('shows error if email is invalid', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: 'Joe',
                            lastName: 'Blogs',
                            email: 'not an email',
                            institution: 'somewhere',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(1);
            expect(getByText('author.validation.email-format')).toBeInTheDocument();
        });
        it('shows error if institution is empty', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: 'Joe',
                            lastName: 'Blogs',
                            email: 'joe@blogs.com',
                            institution: '',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(1);
            expect(getByText('author.validation.institution-required')).toBeInTheDocument();
        });
        it('should not display validation messages when correct values are passed in', async (): Promise<void> => {
            const { getByText, container } = render(
                <AuthorDetailsForm
                    initialValues={{
                        author: {
                            firstName: 'Joe',
                            lastName: 'Blogs',
                            email: 'joe@blogs.com',
                            institution: 'somewhere',
                        },
                        id: 'foo',
                        articleType: '',
                        updated: nowISOString,
                    }}
                    schemaFactory={AuthorDetailsSchema}
                    ButtonComponent={ButtonComponent}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.typography__label--error')).toHaveLength(0);
        });
    });
});
