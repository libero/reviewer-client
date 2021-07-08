import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import Survey from './Survey';
import routerWrapper from '../../../test-utils/routerWrapper';

const mutationMock = jest.fn();

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

describe('Survey', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        }).not.toThrow();
    });

    it('should start on page 1', async (): Promise<void> => {
        const { container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        expect(container.querySelector('#survey-part-1')).not.toBeNull();
    });

    it('should navigate to the next page', async (): Promise<void> => {
        const { getByText, container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        fireEvent.click(getByText('navigation.skip'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
    });

    it('should navigate back the previous page', async (): Promise<void> => {
        const { getByText, container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        fireEvent.click(getByText('navigation.skip'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
        fireEvent.click(getByText('navigation.back'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-1')).not.toBeNull();
    });

    // FIXME: This test should not be skipped
    it.skip('should submit valid data', async (): Promise<void> => {
        const defaultValues = {
            submittingAs: 'first-author',
            independentResearcher: 'yes',
            independentResearcherYear: '1990',
            genderIdentity: 'self-describe',
            genderSelfDescribe: 'popsicle',
            countryOfResidence: { label: 'USA', value: 'US' },
            secondCountryOfResidence: { label: 'USA', value: 'US' },
            countryIndentifyAs: 'yes',
            raceOrEthnicity: 'jedi',
        };

        const result = {
            variables: {
                surveyId: 'ediSurvey',
                answers: [
                    {
                        answer: 'first-author',
                        text: 'submittingAs.label',
                        questionId: 'submittingAs',
                    },
                    {
                        answer: 'yes',
                        text: 'independentResearcher.label',
                        questionId: 'independentResearcher',
                    },
                    {
                        answer: '1990',
                        text: 'independentResearcherYear.label',
                        questionId: 'independentResearcherYear',
                    },
                ],
                submissionId: 'someid',
            },
        };

        // FIXME: The ID set here, is not making it through to onSubmit callback.
        const { getByText, getByLabelText, container } = render(<Survey />, {
            wrapper: routerWrapper(['/survey/someid']),
        });

        fireEvent.click(getByLabelText('submittingAs.options-0'));
        await waitFor(() => {});

        fireEvent.click(getByLabelText('independentResearcher.options-0'));
        await waitFor(() => {});

        // FIXME: This isn't actually populating the text in the control
        //fireEvent.change(getByLabelText('independentResearcherYear.label'), {target: { value: '1990'}});
        //await waitFor(() => {});

        fireEvent.click(getByText('navigation.next'));
        await waitFor(() => {});

        expect(container.querySelector('#survey-part-2')).not.toBeNull();

        // FIXME: This should be skip not done, the components aren't correctly asserting if they are dirty or not.
        fireEvent.click(getByText('navigation.done'));
        await waitFor(() => {});

        expect(mutationMock).toBeCalledWith(result);
    });
});
