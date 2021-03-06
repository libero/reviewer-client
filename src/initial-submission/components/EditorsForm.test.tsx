import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import EditorsForm from './EditorsForm';
import { Submission } from '../types';
import appContainer from '../../../test-utils/appContainer';
import routerWrapper from '../../../test-utils/routerWrapper';
import { EditorsSchema } from '../utils/validationSchemas';
import * as yup from 'yup';

const nowISOString = new Date().toISOString();
const mutationMock = jest.fn();
const testInitialValues: Submission = {
    id: 'blah',
    articleType: '',
    updated: nowISOString,
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
        } else if (options.variables.role === 'leadership') {
            return {
                data: {
                    getEditors: [
                        {
                            id: '5',
                            name: 'Deputy James Bond',
                            aff: 'MI6',
                            focuses: ['Spying', 'Vodka'],
                            expertises: ['Marksmanship', 'One Liners'],
                        },
                        {
                            id: '6',
                            name: 'Deputy Blofeld',
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
                        id: '4',
                        name: 'Scaramanga',
                        aff: 'None',
                        focuses: ['Dueling', 'Gunsmithing'],
                        expertises: ['Marksmanship'],
                    },
                    {
                        id: '3',
                        name: 'Alec Trevelyan',
                        aff: 'MI6',
                        focuses: ['Space Based Ion Weaponry', 'Money'],
                        expertises: ['Betrayal', 'One Liners'],
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
            render(<EditorsForm schemaFactory={EditorsSchema} initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });
        }).not.toThrow();
    });

    describe('validation', () => {
        it('displays a validation message if no reason is given when there are excluded senior editors selected', async (): Promise<
            void
        > => {
            const { getByText } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedSeniorEditors: ['1'],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(getByText('editors.validation.opposed-senior-editors-reason-required')).toBeInTheDocument();
        });
        it('displays a validation message if no reason is provided but editing reviewers are excluded', async (): Promise<
            void
        > => {
            const { baseElement, container, getByText } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={testInitialValues}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const excludeTooggle = getByText('editors.opposed-reviewing-editors-toggle-action-text');
            expect(excludeTooggle).toBeInTheDocument();
            fireEvent.click(excludeTooggle);
            const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
            expect(opposedReviewingEditors).toBeInTheDocument();
            fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .people-picker__modal_list--item:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(
                baseElement.querySelector('.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button'),
            );
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

            fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
            const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
            expect(reasonInput).toBeInTheDocument();
            expect(
                container.querySelectorAll('.opposed-reviewing-editors-picker .selected_people_list__item').length,
            ).toEqual(2);
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.excluded-toggle__panel .typography__label--error').textContent).toBe(
                'editors.validation.opposed-reviewing-editors-reason-required',
            );
        });
        it('limits the user to 6 entries', () => {
            const { getByLabelText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
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
                    wrapper: routerWrapper(),
                },
            );
            expect(container.querySelectorAll('.suggestedReviewers__inputs .expanding-email-field__row')).toHaveLength(
                6,
            );
            expect(() => getByLabelText('editors.reviewers-label-prefix 7 expanding-email-field.name')).toThrow();
        });

        it('empty rows are valid', async (): Promise<void> => {
            const { getByText, getByLabelText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={testInitialValues}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
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

        it('requires an email if name has value', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: '' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
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
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewers: [{ name: '', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.suggestedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-name-required',
            );
        });

        it('should trim email', async (): Promise<void> => {
            const { getByText } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'test',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name', email: '   email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'test',
                    details: {
                        opposedReviewers: [],
                        opposedReviewersReason: '',
                        opposedReviewingEditors: [],
                        opposedReviewingEditorsReason: '',
                        opposedSeniorEditors: [],
                        opposedSeniorEditorsReason: '',
                        suggestedReviewers: [
                            {
                                email: 'email@example.com',
                                name: 'name',
                            },
                        ],
                        suggestedReviewingEditors: [],
                        suggestedSeniorEditors: [],
                    },
                },
            });
        });

        it('requires a valid email format if email is filled', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: 'notanemail' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
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
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.suggestedReviewers__inputs .typography__label--error')).toHaveLength(0);
        });
        it('limits the user to 2 opposed reviewers', () => {
            const { getByLabelText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [
                                { name: 'name1', email: 'email@example.com' },
                                { name: 'name2', email: 'email@example.com' },
                            ],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(container.querySelectorAll('.opposedReviewers__inputs .expanding-email-field__row')).toHaveLength(2);
            expect(() =>
                getByLabelText('editors.opposed-reviewers-label-prefix 3 expanding-email-field.name'),
            ).toThrow();
        });

        it('requires a name if email has value', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: '', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.opposedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-name-required',
            );
        });

        it('requires a valid email format if email is filled', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: 'name1', email: 'notanemail' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.opposedReviewers__inputs .typography__label--error').textContent).toBe(
                'editors.validation.reviewers-email-valid',
            );
        });
        it('requires a reason value if opposed reviewer has a value', async (): Promise<void> => {
            const { getByText } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(getByText('editors.validation.opposed-reviewers-reason-required')).toBeInTheDocument();
        });
        it('is valid with opposed reviewers and a reason', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={EditorsSchema}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                            opposedReviewersReason: 'some reason',
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(() => getByText('editors.validation.opposed-reviewers-reason-required')).toThrow();
            expect(container.querySelectorAll('.opposedReviewers__inputs .typography__label--error')).toHaveLength(0);
        });
    });

    describe('PeoplePickers', (): void => {
        it('display a senior editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('display a deputy editors with senior editors', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('Deputy James Bond')).toBeInTheDocument();
        });

        it('display a reviewing editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('display a reviewing editors when picker is clicked', async () => {
            const { baseElement, container, getByText, getAllByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const reviewingEditorPicker = container.querySelector('.reviewing-editors-picker');
            expect(reviewingEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[1]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            expect(getByText('Scaramanga')).toBeInTheDocument();
        });

        it('displays a senior editor as selected when they have been added in the people picker', async (): Promise<
            void
        > => {
            const { baseElement, container, getAllByText, getByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .people-picker__modal_list--item:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(
                baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(odd) .pod .pod__button',
                ),
            );
            fireEvent.click(
                baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(even) .pod .pod__button',
                ),
            );
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(2);
            fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
        });

        it('displays list of senior editors sorted by name', async (): Promise<void> => {
            const { baseElement, container, getAllByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const seniorEditorPicker = container.querySelector('.senior-editors-picker');
            expect(seniorEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const editors = Array.from(baseElement.querySelectorAll('.people-picker__modal_list--item'));
            expect(editors[0].querySelector('.person-pod__text span').innerHTML).toBe('Blofeld');
            expect(editors[1].querySelector('.person-pod__text span').innerHTML).toBe('Deputy Blofeld');
            expect(editors[2].querySelector('.person-pod__text span').innerHTML).toBe('Deputy James Bond');
            expect(editors[3].querySelector('.person-pod__text span').innerHTML).toBe('James Bond');
        });

        describe('Excluded senior editors', () => {
            it('renders with excluded senior editors section closed when no excluded senior editors or reason in initial values', () => {
                const { getByText, container } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                expect(getByText('editors.opposed-senior-editors-toggle-action-text')).toBeInTheDocument();
                expect(container.querySelector('.opposed-senior-editors-picker')).not.toBeInTheDocument();
                expect(container.querySelector('#opposedSeniorEditorsReason')).not.toBeInTheDocument();
            });
            it('renders with excluded senior editors section open when excluded senior editors or reason in initial values', async (): Promise<
                void
            > => {
                const { getByText, container, rerender } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={{
                            id: 'blah',
                            articleType: '',
                            updated: nowISOString,
                            editorDetails: {
                                opposedSeniorEditors: ['1'],
                            },
                        }}
                        ButtonComponent={ButtonComponent}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                expect(() => getByText('editors.opposed-senior-editors-toggle-action-text')).toThrow();
                expect(container.querySelector('.opposed-senior-editors-picker')).toBeInTheDocument();
                expect(container.querySelector('#opposedSeniorEditorsReason')).toBeInTheDocument();
                rerender(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={{
                            id: 'blah',
                            articleType: '',
                            updated: nowISOString,
                            editorDetails: {
                                opposedSeniorEditorsReason: 'some reason',
                            },
                        }}
                        ButtonComponent={ButtonComponent}
                    />,
                );
                await waitFor(() => {});
                expect(() => getByText('editors.opposed-senior-editors-toggle-action-text')).toThrow();
                expect(container.querySelector('.opposed-senior-editors-picker')).toBeInTheDocument();
                expect(container.querySelector('#opposedSeniorEditorsReason')).toBeInTheDocument();
            });
            it('clears the excluded senior editors and reason when the toggle section is closed', () => {
                const { getByText, container } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={{
                            id: 'blah',
                            articleType: '',
                            updated: nowISOString,
                            editorDetails: {
                                opposedSeniorEditors: ['1'],
                                opposedSeniorEditorsReason: 'some reason',
                            },
                        }}
                        ButtonComponent={ButtonComponent}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                expect(container.querySelectorAll('.opposed-senior-editors-picker .pod')).toHaveLength(1);
                expect(container.querySelector<HTMLTextAreaElement>('[name="opposedSeniorEditorsReason"]').value).toBe(
                    'some reason',
                );
                fireEvent.click(container.querySelector('.excluded-toggle__close-button'));
                fireEvent.click(getByText('editors.opposed-senior-editors-toggle-action-text'));
                expect(container.querySelectorAll('.opposed-senior-editors-picker .pod')).toHaveLength(1);
                expect(container.querySelector<HTMLTextAreaElement>('[name="opposedSeniorEditorsReason"]').value).toBe(
                    '',
                );
            });

            it('should limit the user to adding 1 opposed senior editor', async (): Promise<void> => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                fireEvent.click(getByText('editors.opposed-senior-editors-toggle-action-text'));
                fireEvent.click(container.querySelector('.people-picker.opposed-senior-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay .banner')).not.toBeInTheDocument();
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button',
                    ),
                );
                expect(baseElement.querySelector('.modal__overlay .banner')).toBeInTheDocument();
            });

            it('displays list of senior editors to exclude sorted by name', async (): Promise<void> => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                fireEvent.click(getByText('editors.opposed-senior-editors-toggle-action-text'));
                fireEvent.click(container.querySelector('.people-picker.opposed-senior-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay .banner')).not.toBeInTheDocument();
                await waitFor(() => {});
                const editors = Array.from(baseElement.querySelectorAll('.people-picker__modal_list--item'));
                expect(editors[0].querySelector('.person-pod__text span').innerHTML).toBe('Blofeld');
                expect(editors[1].querySelector('.person-pod__text span').innerHTML).toBe('Deputy Blofeld');
                expect(editors[2].querySelector('.person-pod__text span').innerHTML).toBe('Deputy James Bond');
                expect(editors[3].querySelector('.person-pod__text span').innerHTML).toBe('James Bond');
            });
        });

        describe('Excluded reviewing editors', () => {
            it('displays an excluded reviewing editor when they been selected and reason to be added', async (): Promise<
                void
            > => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                const excludeTooggle = getByText('editors.opposed-reviewing-editors-toggle-action-text');
                expect(excludeTooggle).toBeInTheDocument();
                fireEvent.click(excludeTooggle);
                const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
                expect(opposedReviewingEditors).toBeInTheDocument();
                fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
                await waitFor(() => {});
                const selectedName = baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(1) .person-pod__text .typography__body--primary',
                ).textContent;
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button',
                    ),
                );
                expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

                fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
                expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
                expect(getByText(selectedName)).toBeInTheDocument();
                const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
                expect(reasonInput).toBeInTheDocument();
                fireEvent.change(reasonInput, { target: { value: 'reason' } });
                await waitFor(() => {});
                expect((reasonInput as HTMLInputElement).value).toBe('reason');
            });

            it('displays list of reviewing editors to exclude sorted by name', async (): Promise<void> => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                const excludeTooggle = getByText('editors.opposed-reviewing-editors-toggle-action-text');
                expect(excludeTooggle).toBeInTheDocument();
                fireEvent.click(excludeTooggle);
                const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
                expect(opposedReviewingEditors).toBeInTheDocument();
                fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
                await waitFor(() => {});
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button',
                    ),
                );
                expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);
                await waitFor(() => {});
                const editors = Array.from(baseElement.querySelectorAll('.people-picker__modal_list--item'));
                expect(editors[0].querySelector('.person-pod__text span').innerHTML).toBe('Alec Trevelyan');
                expect(editors[1].querySelector('.person-pod__text span').innerHTML).toBe('Scaramanga');
            });

            it('selecting cancel on oppopsed reviewing editors should clear values', async (): Promise<void> => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                const excludeTooggle = getByText('editors.opposed-reviewing-editors-toggle-action-text');
                expect(excludeTooggle).toBeInTheDocument();
                fireEvent.click(excludeTooggle);
                const opposedReviewingEditors = container.querySelector('.opposed-reviewing-editors-picker');
                expect(opposedReviewingEditors).toBeInTheDocument();
                fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
                await waitFor(() => {});
                const selectedName = baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(1) .person-pod__text .typography__body--primary',
                ).textContent;
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button',
                    ),
                );
                expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(1);

                fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
                expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
                expect(getByText(selectedName)).toBeInTheDocument();
                const reasonInput = container.querySelector('#opposedReviewingEditorsReason');
                expect(reasonInput).toBeInTheDocument();
                fireEvent.change(reasonInput, { target: { value: 'reason' } });
                await waitFor(() => {});
                expect((reasonInput as HTMLInputElement).value).toBe('reason');
                const closeButton = container.querySelector('.excluded-toggle__close-button');
                expect(closeButton).toBeInTheDocument();
                fireEvent.click(closeButton);
                expect(closeButton).not.toBeInTheDocument();
                expect(reasonInput).not.toBeInTheDocument();
                expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            });

            it('should limit the user to adding 2 opposed reviewing editor', async (): Promise<void> => {
                const { baseElement, container, getByText } = render(
                    <EditorsForm
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={testInitialValues}
                    />,
                    {
                        container: appContainer(),
                        wrapper: routerWrapper(),
                    },
                );
                fireEvent.click(getByText('editors.opposed-reviewing-editors-toggle-action-text'));
                fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
                expect(baseElement.querySelector('.modal__overlay .banner')).not.toBeInTheDocument();
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(1) .pod__button',
                    ),
                );
                expect(baseElement.querySelector('.modal__overlay .banner')).not.toBeInTheDocument();
                fireEvent.click(
                    baseElement.querySelector(
                        '.modal__overlay .people-picker__modal_list--item:nth-child(2) .pod__button',
                    ),
                );
                expect(baseElement.querySelector('.modal__overlay .banner')).toBeInTheDocument();
            });
        });

        it('displays a revieweing editor as selected when they have been added in the people picker', async (): Promise<
            void
        > => {
            const { baseElement, container, getAllByText, getByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            const reviewingEditorPicker = container.querySelector('.reviewing-editors-picker');
            expect(reviewingEditorPicker).toBeInTheDocument();
            fireEvent.click(getAllByText('selected_people_list--open')[0]);
            expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
            await waitFor(() => {});
            const selectedName = baseElement.querySelector(
                '.modal__overlay .people-picker__modal_list--item:nth-child(1) .person-pod__text .typography__body--primary',
            ).textContent;
            fireEvent.click(
                baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(odd) .pod .pod__button',
                ),
            );
            fireEvent.click(
                baseElement.querySelector(
                    '.modal__overlay .people-picker__modal_list--item:nth-child(even) .pod .pod__button',
                ),
            );
            expect(baseElement.querySelectorAll('.modal__overlay svg.person-pod__selected_icon')).toHaveLength(2);
            fireEvent.click(baseElement.querySelector('.modal__overlay .modal__buttons .button--primary'));
            expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
            expect(getByText(selectedName)).toBeInTheDocument();
        });

        it('displays initial value senior editors', () => {
            const { getByText } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedSeniorEditors: ['1'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(getByText('James Bond')).toBeInTheDocument();
        });

        it('displays initial value reviewing editors', () => {
            const { getByText } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewingEditors: ['4'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(getByText('Scaramanga')).toBeInTheDocument();
        });

        it('removes a deleted reviewing editor', async (): Promise<void> => {
            const { container, getByText } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedReviewingEditors: ['4'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
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
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            suggestedSeniorEditors: ['1'],
                        },
                    }}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
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
                        schemaFactory={(): yup.ObjectSchema => yup.object()}
                        initialValues={{
                            id: 'blah',
                            articleType: '',
                            updated: nowISOString,
                            editorDetails: {
                                suggestedSeniorEditors: ['apple'],
                                suggestedReviewingEditors: ['pear'],
                            },
                        }}
                    />,
                    { wrapper: routerWrapper() },
                );
            }).not.toThrow();
        });
    });
    describe('Suggested reviewers', () => {
        it('renders a single empty row of name email fields', () => {
            const { getByLabelText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.name')).toBeInTheDocument();
            expect(getByLabelText('editors.reviewers-label-prefix 1 expanding-email-field.email')).toBeInTheDocument();
            expect(() => getByLabelText('editors.reviewers-label-prefix 2 expanding-email-field.name')).toThrow();
        });

        it('populates with multiple initial suggestedReviewers values', async (): Promise<void> => {
            const { getByLabelText, container } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
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
                    wrapper: routerWrapper(),
                },
            );
            await waitFor(() => {});
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
    });

    describe('opposedReviewers', () => {
        it('renders with opposed reviewers section closed when no opposed reviewers or reason in initial values', () => {
            const { getByText, container } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(getByText('editors.opposed-reviewers-toggle-action-text')).toBeInTheDocument();
            expect(container.querySelector('.opposedReviewers__inputs')).not.toBeInTheDocument();
            expect(container.querySelector('#opposedReviewersReason')).not.toBeInTheDocument();
        });

        it('renders with opposed reviewers section open when opposed reviewers or reason in initial values', async (): Promise<
            void
        > => {
            const { getByText, container, rerender } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(() => getByText('editors.opposed-reviewers-toggle-action-text')).toThrow();
            expect(container.querySelector('.opposedReviewers__inputs')).toBeInTheDocument();
            expect(container.querySelector('#opposedReviewersReason')).toBeInTheDocument();
            rerender(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewersReason: 'some reason',
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
            );
            await waitFor(() => {});
            expect(() => getByText('editors.opposed-reviewers-toggle-action-text')).toThrow();
            expect(container.querySelector('.opposedReviewers__inputs')).toBeInTheDocument();
            expect(container.querySelector('#opposedReviewersReason')).toBeInTheDocument();
        });

        it('clicking opposed toggle displays opposed reviewers fields and reason textarea', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            expect(container.querySelector('.opposedReviewers__inputs')).not.toBeInTheDocument();
            expect(container.querySelector('#opposedReviewersReason')).not.toBeInTheDocument();
            fireEvent.click(getByText('editors.opposed-reviewers-toggle-action-text'));
            await waitFor(() => {});
            expect(container.querySelector('.opposedReviewers__inputs')).toBeInTheDocument();
            expect(container.querySelector('#opposedReviewersReason')).toBeInTheDocument();
        });
        it('displays list of reviewing editors to exclude sorted by name', async (): Promise<void> => {
            const { baseElement, container, getByText } = render(
                <EditorsForm schemaFactory={(): yup.ObjectSchema => yup.object()} initialValues={testInitialValues} />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );
            fireEvent.click(getByText('editors.opposed-reviewing-editors-toggle-action-text'));
            fireEvent.click(container.querySelector('.people-picker.opposed-reviewing-editors-picker button'));
            expect(baseElement.querySelector('.modal__overlay .banner')).not.toBeInTheDocument();
            await waitFor(() => {});
            const editors = Array.from(baseElement.querySelectorAll('.people-picker__modal_list--item'));
            expect(editors[0].querySelector('.person-pod__text span').innerHTML).toBe('Alec Trevelyan');
            expect(editors[1].querySelector('.person-pod__text span').innerHTML).toBe('Scaramanga');
        });
        it('clears opposed values and reason if toggle section is close', async (): Promise<void> => {
            const { getByText, container } = render(
                <EditorsForm
                    schemaFactory={(): yup.ObjectSchema => yup.object()}
                    initialValues={{
                        id: 'blah',
                        articleType: '',
                        updated: nowISOString,
                        editorDetails: {
                            opposedReviewers: [{ name: 'name1', email: 'email@example.com' }],
                            opposedReviewersReason: 'some reason',
                        },
                    }}
                    ButtonComponent={ButtonComponent}
                />,
                {
                    container: appContainer(),
                    wrapper: routerWrapper(),
                },
            );

            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewers[0].name"]').value).toBe('name1');
            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewers[0].email"]').value).toBe(
                'email@example.com',
            );
            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewersReason"]').value).toBe(
                'some reason',
            );
            fireEvent.click(container.querySelector('.excluded-toggle__close-button'));
            fireEvent.click(getByText('editors.opposed-reviewers-toggle-action-text'));
            await waitFor(() => {});
            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewers[0].name"]').value).toBe('');
            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewers[0].email"]').value).toBe('');
            expect(container.querySelector<HTMLInputElement>('[name="opposedReviewersReason"]').value).toBe('');
        });
    });
});
