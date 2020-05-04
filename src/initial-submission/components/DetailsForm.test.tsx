import '../../../test-utils/i18n-mock';
import React, { useEffect, useRef, DependencyList } from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import DetailsForm from './DetailsForm';
import { Submission } from '../types';

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
        it('shows error message if title is empty', async () => {
            const { getByText, debug } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated: Date.now(),
                        articleType: '',
                    }}
                    ButtonComponent={({
                        _,
                        triggerValidation,
                    }: {
                        _: Function;
                        triggerValidation: () => Promise<boolean>;
                    }): JSX.Element => <button onClick={triggerValidation}>TEST BUTTON</button>}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => expect(getByText('details.validation.title-required')).toBeInTheDocument());
            debug();
        });
    });
});
