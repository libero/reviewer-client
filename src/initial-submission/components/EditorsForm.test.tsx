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
        if (options.variables.role === 'seniorEditors') {
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

describe('DetailsForm', (): void => {
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
    });
});
