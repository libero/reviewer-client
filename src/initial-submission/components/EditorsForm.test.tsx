import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import EditorsForm from './EditorsForm';
import { Submission } from '../types';
import appContainer from '../../../test-utils/appContainer';

const mutationMock = jest.fn();
const testInitialValues: Submission = {
    id: 'blah',
    articleType: '',
    updated: Date.now(),
};

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
    useQuery: (_: unknown, options: { variables: { role: string } }): { data: object; loading: boolean } => {
        if (options.variables.role === 'seniorEditor') {
            return {
                data: {
                    getEditors: [
                        {
                            id: '1',
                            name: 'James Bond',
                            aff: 'MI6',
                            focuses: ['Spying', 'Vodka'],
                            expertises: ['Marksmanship', 'One Liners'],
                        },
                        {
                            id: '2',
                            name: 'Blofeld',
                            aff: 'Spectre',
                            focuses: ['World Domination', 'Money', 'Evil'],
                            expertises: ['White Cats'],
                        },
                    ],
                },
                loading: false,
            };
        }
        return {
            data: {
                getEditors: [
                    {
                        id: '3',
                        name: 'Alec Trevelyan',
                        aff: 'MI6',
                        focuses: ['Space Based Ion Weaponry', 'Money'],
                        expertises: ['Betrayal', 'One Liners'],
                    },
                    {
                        id: '4',
                        name: 'Scaramanga',
                        aff: 'None',
                        focuses: ['Dueling', 'Gunsmithing'],
                        expertises: ['Marksmanship'],
                    },
                ],
            },
            loading: false,
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

describe('EditorsDetailsForm', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<EditorsForm initialValues={testInitialValues} />);
        }).not.toThrow();
    });

    describe('PeoplePickers', (): void => {
        it('display a senior editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            await fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('display a reviewing editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            await fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('display a reviewing editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                },
            );
            const reviewingEditorPicker = container.querySelector('.reviewing-editors-picker');
            expect(reviewingEditorPicker).toBeInTheDocument();
            await fireEvent.click(getAllByText('selected_people_list--open')[1]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('Scaramanga')).toBeInTheDocument();
        });

        it('displays a senior editor as selected when they have been added in the people picker', async (): Promise<
            void
        > => {
            const { baseElement, container, getAllByText, getByText } = render(
                <EditorsForm initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            await fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .pod:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(baseElement.querySelector('.modal__overlay .pod:nth-child(1) .pod__button'));
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);
            fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
        });

        it('displays an excluded reviewing editor when they been selected and reason to be added', async (): Promise<
            void
        > => {
            const { baseElement, container, getByText } = render(<EditorsForm initialValues={testInitialValues} />, {
                container: appContainer(),
            });
            const excludeTooggle = container.querySelector('.excluded-toggle__action');
            expect(excludeTooggle).toBeInTheDocument();
            await fireEvent.click(excludeTooggle);
            const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
            expect(opposedReviewingEditors).toBeInTheDocument();
            await fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .pod:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(baseElement.querySelector('.modal__overlay .pod:nth-child(1) .pod__button'));
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

            await fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
            const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
            expect(reasonInput).toBeInTheDocument();
            await fireEvent.change(reasonInput, { target: { value: 'reason' } });
            await waitFor(() => {});
            expect((reasonInput as HTMLInputElement).value).toBe('reason');
        });

        it('displays a validation message if no reason is provided but editing reviewers are excluded', async (): Promise<
            void
        > => {
            const { baseElement, container, getByText } = render(
                <EditorsForm initialValues={testInitialValues} ButtonComponent={ButtonComponent} />,
                {
                    container: appContainer(),
                },
            );
            const excludeTooggle = container.querySelector('.excluded-toggle__action');
            expect(excludeTooggle).toBeInTheDocument();
            await fireEvent.click(excludeTooggle);
            const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
            expect(opposedReviewingEditors).toBeInTheDocument();
            await fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .pod:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            await fireEvent.click(baseElement.querySelector('.modal__overlay .pod:nth-child(1) .pod__button'));
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

            await fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
            const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
            expect(reasonInput).toBeInTheDocument();
            expect(
                container.querySelectorAll('.opposed-reviewing-editors-picker .selected_people_list__item').length,
            ).toEqual(2);
            await fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.typography__label--error').textContent).toBe(
                'editors.validation.opposed-reviewing-editor-reason-required',
            );
        });

        it('selecting cancel on oppopsed reviewing editors should clear values', async (): Promise<void> => {
            const { baseElement, container, getByText } = render(<EditorsForm initialValues={testInitialValues} />, {
                container: appContainer(),
            });
            const excludeTooggle = container.querySelector('.excluded-toggle__action');
            expect(excludeTooggle).toBeInTheDocument();
            await fireEvent.click(excludeTooggle);
            const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
            expect(opposedReviewingEditors).toBeInTheDocument();
            await fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .pod:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(baseElement.querySelector('.modal__overlay .pod:nth-child(1) .pod__button'));
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

            await fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
            const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
            expect(reasonInput).toBeInTheDocument();
            await fireEvent.change(reasonInput, { target: { value: 'reason' } });
            await waitFor(() => {});
            expect((reasonInput as HTMLInputElement).value).toBe('reason');
            const closeButton = container.querySelector('.excluded-toggle__close-button');
            expect(closeButton).toBeInTheDocument();
            await fireEvent.click(closeButton);
            expect(closeButton).not.toBeInTheDocument();
            expect(reasonInput).not.toBeInTheDocument();
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
        });

        it('displays a revieweing editor as selected when they have been added in the people picker', async (): Promise<
            void
        > => {
            const { baseElement, container, getAllByText, getByText } = render(
                <EditorsForm initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                },
            );
            const reviewingEditorPicker = container.querySelector('.reviewing-editors-picker');
            expect(reviewingEditorPicker).toBeInTheDocument();
            await fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .pod:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(baseElement.querySelector('.modal__overlay .pod:nth-child(1) .pod__button'));
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);
            fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
        });

        it('displays initial value senior editors', () => {
            const { getByText } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedSeniorEditors: ['1'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('displays initial value reviewing editors', () => {
            const { getByText } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewingEditors: ['4'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(getByText('Scaramanga')).toBeInTheDocument();
        });

        it('removes a deleted reviewing editor', async (): Promise<void> => {
            const { container, getByText } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewingEditors: ['4'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(getByText('Scaramanga')).toBeInTheDocument();
            fireEvent.click(
                container.querySelector(
                    '.reviewing-editors-picker .selected_people_list__item:nth-child(1) .pod__button',
                ),
            );
            expect(() => getByText('Scaramanga')).toThrow();
        });

        it('removes a deleted senior editor', async (): Promise<void> => {
            const { container, getByText } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedSeniorEditors: ['1'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(getByText('James Bond')).toBeInTheDocument();
            fireEvent.click(
                container.querySelector('.senior-editors-picker .selected_people_list__item:nth-child(1) .pod__button'),
            );
            expect(() => getByText('James Bond')).toThrow();
        });

        it('handles selected people removed from api', () => {
            expect(async () => {
                render(
                    <EditorsForm
                        initialValues={{
                            id: 'blah',
                            articleType: '',
                            updated: Date.now(),
                            editorDetails: {
                                suggestedSeniorEditors: ['apple'],
                                suggestedReviewingEditors: ['pear'],
                            },
                        }}
                    />,
                );
            }).not.toThrow();
        });
    });
    describe('Suggested reviewers', () => {
        it('renders a single empty row of name email fields', () => {
            const { getByLabelText } = render(<EditorsForm initialValues={testInitialValues} />, {
                container: appContainer(),
            });
            expect(getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.name')).toBeInTheDocument();
            expect(getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.email')).toBeInTheDocument();
            expect(() => getByLabelText('editors.reviewers-label-prefix 2 expanding-email-field.name')).toThrow();
        });

        it('populates with multiple initial suggestedReviewers values', () => {
            const { getByLabelText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [
                                { name: 'name1', email: 'email@example.com' },
                                { name: 'name2', email: 'email@example.com' },
                                { name: 'name3', email: 'email@example.com' },
                            ],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(container.querySelectorAll('.suggestedReviewers__inputs .expanding-email-field__row')).toHaveLength(
                4,
            );
            expect(
                (getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.name') as HTMLInputElement)
                    .value,
            ).toBe('name1');
            expect(
                (getByLabelText('editors.reviewers-label-prefix 2 expanding-email-field.name') as HTMLInputElement)
                    .value,
            ).toBe('name2');
            expect(
                (getByLabelText('editors.reviewers-label-prefix 3 expanding-email-field.name') as HTMLInputElement)
                    .value,
            ).toBe('name3');
        });
        it('limits the user to 6 entries', () => {
            const { getByLabelText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [
                                { name: 'name1', email: 'email@example.com' },
                                { name: 'name2', email: 'email@example.com' },
                                { name: 'name3', email: 'email@example.com' },
                                { name: 'name4', email: 'email@example.com' },
                                { name: 'name5', email: 'email@example.com' },
                                { name: 'name6', email: 'email@example.com' },
                            ],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                },
            );
            expect(container.querySelectorAll('.suggestedReviewers__inputs .expanding-email-field__row')).toHaveLength(
                6,
            );
            expect(() => getByLabelText('editors.reviewers-label-prefix 7 expanding-email-field.name')).toThrow();
        });

        it('empty rows are valid', async (): Promise<void> => {
            const { getByText, getByLabelText, container } = render(
                <EditorsForm initialValues={testInitialValues} ButtonComponent={ButtonComponent} />,
                {
                    container: appContainer(),
                },
            );

            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(
                (getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.name') as HTMLInputElement)
                    .value,
            ).toBe('');
            expect(
                (getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.email') as HTMLInputElement)
                    .value,
            ).toBe('');
            expect(container.querySelectorAll('.suggestedReviewers__inputs .typography__label--error')).toHaveLength(0);
        });

        it('requires a email if name has value', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: '' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.suggestedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-email-required',
            );
        });
        it('requires a name if email has value', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [{ name: '', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.suggestedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-name-required',
            );
        });

        it('requires a valid email format if email is filled', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: 'notanemail' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.suggestedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-email-valid',
            );
        });
        it('is valid if there is a name and valid email in a row', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: Date.now(),
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.suggestedReviewers__inputs .typography__label--error')).toHaveLength(0);
        });
    });
});
