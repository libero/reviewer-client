import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import AuthorDetailsForm from './AuthorDetailsForm';
import { Submission } from '../types';

const mutationMock = jest.fn();
const testInitialValues: Submission = { id: 'foo', updated: Date.now(), articleType: '' };

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
                    name: 'Blogs, Joe',
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

const initialValues: Submission = {
    author: {
        firstName: 'Joe',
        lastName: 'Blogs',
        email: 'joe@blogs.com',
        institution: 'somewhere',
    },
    id: 'foo',
    articleType: '',
    updated: 0,
};

describe('Author Details Form', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<AuthorDetailsForm initialValues={initialValues} />);
        }).not.toThrow();
    });

    it('should render correctly with all props', async (): Promise<void> => {
        expect(
            async (): Promise<void> => {
                render(<AuthorDetailsForm initialValues={initialValues} />);
            },
        ).not.toThrow();
    });
    it('should fill the correct boxes with author information when the text is clicked', async (): Promise<void> => {
        const { container, getByLabelText } = render(<AuthorDetailsForm initialValues={testInitialValues} />);
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
            updated: 0,
        };
        const { getByLabelText } = render(<AuthorDetailsForm initialValues={initialValues} />);
        expect((getByLabelText('author.author-first-name') as HTMLInputElement).value).toBe('Joe');
        expect((getByLabelText('author.author-last-name') as HTMLInputElement).value).toBe('Blogs');
        expect((getByLabelText('author.author-email') as HTMLInputElement).value).toBe('joe@blogs.com');
        expect((getByLabelText('author.institution') as HTMLInputElement).value).toBe('somewhere');
    });
    describe('autosave', () => {
        it('when a first name is entered it triggers the autosave', () => {
            const { getByLabelText } = render(<AuthorDetailsForm initialValues={testInitialValues} />);

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
            const { getByLabelText } = render(<AuthorDetailsForm initialValues={testInitialValues} />);

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
            const { getByLabelText } = render(<AuthorDetailsForm initialValues={testInitialValues} />);

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
            const { getByLabelText } = render(<AuthorDetailsForm initialValues={testInitialValues} />);

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
});
