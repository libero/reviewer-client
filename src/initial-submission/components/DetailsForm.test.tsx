import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import DetailsForm from './DetailsForm';
import { Submission } from '../types';
import * as config from '../../core/utils/config';

const mutationMock = jest.fn();
const testInitialValues: Submission = {
    id: 'blah',
    articleType: '',
    updated: Date.now(),
};

jest.mock('../../core/utils/config', () => ({
    getConfig: jest.fn().mockImplementation(() => ({
        client: {
            majorSubjectAreas: {
                neuroscience: 'Neuroscience',
                cats: 'cats',
                doom: 'doom',
            },
        },
    })),
}));

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
            render(<DetailsForm initialValues={testInitialValues} />);
        }).not.toThrow();
    });

    it('toggles display of second cosubmission text input when text link is clicked', () => {
        const { container, getByText, getByLabelText } = render(<DetailsForm initialValues={testInitialValues} />);
        expect(getByLabelText('details.cosubmission-toggle')).toBeInTheDocument();
        fireEvent.click(getByLabelText('details.cosubmission-toggle'));
        expect(getByText('details.second-cosubmission-toggle-link')).toBeInTheDocument();
        fireEvent.click(getByText('details.second-cosubmission-toggle-link'));
        expect(container.querySelector('#secondCosubmissionTitle')).toBeInTheDocument();
    });

    it('should get subject areas from config', () => {
        // getConfig is called only once when file is included so no need for render
        expect(config.getConfig).toHaveBeenCalledTimes(1);
    });

    describe('autosave', () => {
        it('when a title is entered it triggers the autosave', () => {
            const { container } = render(<DetailsForm initialValues={testInitialValues} />);
            fireEvent.input(container.querySelector('#title'), {
                target: { value: 'test title' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: [],
                        previouslyDiscussed: '',
                        previouslySubmitted: '',
                        subjects: [],
                        title: 'test title',
                    },
                },
            });
        });

        it('when the subjects are set it should trigger an autosave', () => {
            const { container, getByText } = render(<DetailsForm initialValues={testInitialValues} />);
            fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'ArrowDown', keyCode: 40 });
            fireEvent.click(getByText('Neuroscience'));

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: [],
                        previouslyDiscussed: '',
                        previouslySubmitted: '',
                        subjects: ['neuroscience'],
                        title: '',
                    },
                },
            });
        });

        it('when the previously discussed box is filled it triggers the autosave', () => {
            const { container, getByLabelText } = render(<DetailsForm initialValues={testInitialValues} />);
            fireEvent.click(getByLabelText('details.previously-discussed-toggle'));
            fireEvent.input(container.querySelector('#previouslyDiscussed'), {
                target: { value: 'test discussion' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: [],
                        previouslyDiscussed: 'test discussion',
                        previouslySubmitted: '',
                        subjects: [],
                        title: '',
                    },
                },
            });
        });

        it('when the previously submitted box is filled it triggers the autosave', () => {
            const { container, getByLabelText } = render(<DetailsForm initialValues={testInitialValues} />);
            fireEvent.click(getByLabelText('details.previously-submitted-toggle'));
            fireEvent.input(container.querySelector('#previouslySubmitted'), {
                target: { value: 'test submitted' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: [],
                        previouslyDiscussed: '',
                        previouslySubmitted: 'test submitted',
                        subjects: [],
                        title: '',
                    },
                },
            });
        });

        it('when the first cosubmission box is filled it triggers the autosave', () => {
            const { container, getByText, getByLabelText } = render(<DetailsForm initialValues={testInitialValues} />);
            expect(getByLabelText('details.cosubmission-toggle')).toBeInTheDocument();
            fireEvent.click(getByLabelText('details.cosubmission-toggle'));
            expect(getByText('details.second-cosubmission-toggle-link')).toBeInTheDocument();
            fireEvent.input(container.querySelector('#firstCosubmissionTitle'), {
                target: { value: 'test cosubmission' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: ['test cosubmission', ''],
                        previouslyDiscussed: '',
                        previouslySubmitted: '',
                        subjects: [],
                        title: '',
                    },
                },
            });
        });

        it('when both of the cosubmission boxes are filled it triggers the autosave', () => {
            const { container, getByText, getByLabelText } = render(<DetailsForm initialValues={testInitialValues} />);
            expect(getByLabelText('details.cosubmission-toggle')).toBeInTheDocument();
            fireEvent.click(getByLabelText('details.cosubmission-toggle'));
            expect(getByText('details.second-cosubmission-toggle-link')).toBeInTheDocument();
            fireEvent.input(container.querySelector('#firstCosubmissionTitle'), {
                target: { value: 'test cosubmission' },
            });
            fireEvent.click(getByText('details.second-cosubmission-toggle-link'));
            expect(container.querySelector('#secondCosubmissionTitle')).toBeInTheDocument();
            fireEvent.input(container.querySelector('#secondCosubmissionTitle'), {
                target: { value: 'test second cosubmission' },
            });

            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        cosubmission: ['test cosubmission', 'test second cosubmission'],
                        previouslyDiscussed: '',
                        previouslySubmitted: '',
                        subjects: [],
                        title: '',
                    },
                },
            });
        });
    });

    describe('initialValues', () => {
        it('sets default values to initialValues passed', (): void => {
            const { container } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            title: 'Test title',
                            previouslyDiscussed: 'Previously discussed',
                            previouslySubmitted: 'Previously submitted',
                            cosubmission: ['Cosub1', 'Cosub2'],
                            subjects: ['neuroscience'],
                        },
                    }}
                />,
            );
            expect((container.querySelector('textarea[name=title]') as HTMLInputElement).value).toBe('Test title');
            expect((container.querySelector('textarea[name=previouslyDiscussed]') as HTMLTextAreaElement).value).toBe(
                'Previously discussed',
            );
            expect((container.querySelector('textarea[name=previouslySubmitted]') as HTMLTextAreaElement).value).toBe(
                'Previously submitted',
            );
            expect((container.querySelector('input[name=firstCosubmissionTitle]') as HTMLInputElement).value).toBe(
                'Cosub1',
            );
            expect((container.querySelector('input[name=secondCosubmissionTitle]') as HTMLInputElement).value).toBe(
                'Cosub2',
            );
            expect((container.querySelector('.select-field__multi-value__label') as HTMLInputElement).textContent).toBe(
                'Neuroscience',
            );
        });

        it('collapses all toggles by default', () => {
            const { container } = render(<DetailsForm initialValues={testInitialValues} />);
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(0);
        });

        it('toggles the previously discussed panel if there is a value for previouslyDiscussed', () => {
            const { container, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            previouslyDiscussed: 'test value',
                        },
                    }}
                />,
            );
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(1);
            expect(getByLabelText('details.previously-discussed-label')).toBeInTheDocument();
        });

        it('toggles the previously submitted panel if there is a value for previouslySubmitted', () => {
            const { container, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            previouslySubmitted: 'test value',
                        },
                    }}
                />,
            );
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(1);
            expect(getByLabelText('details.previously-submitted-label')).toBeInTheDocument();
        });

        it('toggles the cosubmission panel if cosubmission has a length > 0', () => {
            const { rerender, container, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            cosubmission: ['test value'],
                        },
                    }}
                />,
            );
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(1);
            expect(getByLabelText('details.cosubmission-title-label')).toBeInTheDocument();
            rerender(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            cosubmission: ['', 'second test value'],
                        },
                    }}
                />,
            );
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(1);
            expect(getByLabelText('details.cosubmission-title-label')).toBeInTheDocument();
            rerender(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            cosubmission: ['first test value', 'second test value'],
                        },
                    }}
                />,
            );
            expect(container.querySelectorAll('.toggle__panel')).toHaveLength(1);
            expect(getByLabelText('details.cosubmission-title-label')).toBeInTheDocument();
        });

        it('does not displays the second cosubmission input if there is no initial value for cosubmission[1]', () => {
            const { getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            cosubmission: ['some value'],
                        },
                    }}
                />,
            );
            expect(() => getByLabelText('details.second-cosubmission-title-label')).toThrow();
        });

        it('displays the second cosubmission input if there is an initial value for cosubmission[1]', () => {
            const { getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                        manuscriptDetails: {
                            cosubmission: ['', 'second test value'],
                        },
                    }}
                />,
            );
            expect(getByLabelText('details.second-cosubmission-title-label')).toBeInTheDocument();
        });
    });

    describe('validation', () => {
        const renderDetails = (): RenderResult => {
            return render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                    }}
                    ButtonComponent={({
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
                    )}
                />,
            );
        };

        it('shows error message if title is empty', async () => {
            const { getByText } = renderDetails();

            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => expect(getByText('details.validation.title-required')).toBeInTheDocument());
        });

        it('shows error message if subjects is empty', async () => {
            const { getByText } = renderDetails();

            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => expect(getByText('details.validation.subjects-required')).toBeInTheDocument());
        });

        it('shows error message if previouslyDiscussed is empty', async () => {
            const { getByText, container } = renderDetails();

            fireEvent.click(container.querySelector('input[name="previouslyDiscussedContainer.toggle"]'));
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() =>
                expect(getByText('details.validation.previously-discussed-required')).toBeInTheDocument(),
            );
        });

        it('shows error message if previouslyConsidered is empty', async () => {
            const { getByText, container } = renderDetails();

            fireEvent.click(container.querySelector('input[name="previouslyConsideredContainer.toggle"]'));
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() =>
                expect(getByText('details.validation.previously-submitted-required')).toBeInTheDocument(),
            );
        });

        it('shows error message if cosubmission is empty', async () => {
            const { getByText, container } = renderDetails();
            fireEvent.click(container.querySelector('input[name="cosubmission.toggle"]'));
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => expect(getByText('details.validation.cosubmission-required')).toBeInTheDocument());
        });

        it('should not display validation messages when correct values are passed in', async () => {
            const fullValues: Submission = {
                ...testInitialValues,
                manuscriptDetails: {
                    title: 'Are cats the biggest threat to humanity?',
                    subjects: ['cats', 'doom'],
                    previouslyDiscussed: 'Discussed with possible cat sympathiser',
                    previouslySubmitted: 'Twice before',
                    cosubmission: ['The end of the age of Man: Cats have invented paw operated can openers'],
                },
            };
            const { container, getByText } = render(
                <DetailsForm
                    initialValues={fullValues}
                    ButtonComponent={({
                        triggerValidation,
                    }: {
                        _: Function;
                        triggerValidation: () => Promise<boolean>;
                    }): JSX.Element => (
                        <button
                            onClick={async (): Promise<void> => {
                                await triggerValidation();
                            }}
                        >
                            TEST BUTTON
                        </button>
                    )}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(container.querySelector('.typography__label--error')).not.toBeInTheDocument();
        });
    });
});
