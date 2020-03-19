import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import DetailsForm from './DetailsForm';

const mutationMock = jest.fn();
jest.mock('../utils/autosave-decorator', () => ({
    AutoSaveDecorator: (cb: () => void): void => cb(),
}));

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
        const updated = Date.now();
        expect(async () => {
            render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
        }).not.toThrow();
    });

    it('toggles display of second cosubmission text input when text link is clicked', () => {
        const updated = Date.now();
        const { container, getByText, getByLabelText } = render(
            <DetailsForm
                initialValues={{
                    id: 'blah',
                    updated,
                }}
            />,
        );
        expect(getByLabelText('details.cosubmission-toggle')).toBeInTheDocument();
        fireEvent.click(getByLabelText('details.cosubmission-toggle'));
        expect(getByText('details.second-cosubmission-toggle-link')).toBeInTheDocument();
        fireEvent.click(getByText('details.second-cosubmission-toggle-link'));
        expect(container.querySelector('#secondCosubmissionTitle')).toBeInTheDocument();
    });

    describe('autosave', () => {
        it('when a title is entered it triggers the autosave', () => {
            const updated = Date.now();
            const { container } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
            const updated = Date.now();
            const { container, getByText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
            const updated = Date.now();
            const { container, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
            const updated = Date.now();
            const { container, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
            const updated = Date.now();
            const { container, getByText, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
                        cosubmission: ['test cosubmission'],
                        previouslyDiscussed: '',
                        previouslySubmitted: '',
                        subjects: [],
                        title: '',
                    },
                },
            });
        });

        it('when both of the cosubmission boxes are filled it triggers the autosave', () => {
            const updated = Date.now();
            const { container, getByText, getByLabelText } = render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                    }}
                />,
            );
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
            const updated = Date.now();
            render(
                <DetailsForm
                    initialValues={{
                        id: 'blah',
                        updated,
                        manuscriptDetails: {
                            title: 'Test title',
                            previouslyDiscussed: 'Previously discussed',
                            previouslySubmitted: 'Previously submitted',
                            cosubmission: ['Coosub1', 'Coosub2'],
                            subjects: ['neuroscience'],
                        },
                    }}
                />,
            );
            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'blah',
                    details: {
                        title: 'Test title',
                        previouslyDiscussed: 'Previously discussed',
                        previouslySubmitted: 'Previously submitted',
                        cosubmission: ['Coosub1', 'Coosub2'],
                        subjects: ['neuroscience'],
                    },
                },
            });
        });

        // TODO: add tests for Toggle open when initalValues are set.
    });
});
