import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import Survey from './Survey';
import routeWrapper from '../../../test-utils/routeWrapper';
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
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
    });

    it('should navigate back the previous page', async (): Promise<void> => {
        const { getByText, container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
        fireEvent.click(getByText('navigation.back'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-1')).not.toBeNull();
    });

    it('should submit valid data', async (): Promise<void> => {
        const result = {
            variables: {
                surveyId: 'ediSurvey',
                submissionId: 'someid',
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
                    {
                        answer: 'self-describe',
                        text: 'genderIdentity.label',
                        questionId: 'genderIdentity',
                    },
                    {
                        answer: 'yes',
                        text: 'countryIndentifyAs.label',
                        questionId: 'countryIndentifyAs',
                    },
                    {
                        answer: 'jedi',
                        text: 'raceOrEthnicity.label',
                        questionId: 'raceOrEthnicity',
                    },
                    {
                        answer: 'AF',
                        text: 'countryOfResidence.label',
                        questionId: 'countryOfResidence',
                    },
                    {
                        answer: 'popsicle',
                        text: 'genderSelfDescribe.label',
                        questionId: 'genderSelfDescribe',
                    },
                    {
                        answer: 'AX',
                        text: 'secondCountryOfResidence.label',
                        questionId: 'secondCountryOfResidence',
                    },
                ],
            },
        };

        const { component } = routeWrapper(Survey, { path: '/survey/:id' });
        const { getByText, getByLabelText, container } = render(component, {
            wrapper: routerWrapper(['/survey/someid']),
        });

        await fireEvent.click(getByLabelText('submittingAs.options-0'));
        await fireEvent.click(getByLabelText('independentResearcher.options-0'));
        const inputIndependentResearcherYear = container.querySelector(
            '#independentResearcherYear',
        ) as HTMLInputElement;
        await fireEvent.change(inputIndependentResearcherYear, { target: { value: '1990' } });

        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});

        await fireEvent.click(getByLabelText('genderIdentity.options-3'));
        await fireEvent.change(getByLabelText('genderSelfDescribe.label'), { target: { value: 'popsicle' } });
        await fireEvent.keyDown(container.querySelector("input[name='countryOfResidence']"), {
            key: 'ArrowDown',
            keyCode: 40,
        });
        await waitFor((): Element => getByText('countryOfResidence.countries-0'));
        await fireEvent.click(getByText('countryOfResidence.countries-0'));
        await fireEvent.click(getByText('countryOfResidence.collapsedText'));
        await fireEvent.keyDown(container.querySelector("input[name='secondCountryOfResidence']"), {
            key: 'ArrowDown',
            keyCode: 40,
        });
        await waitFor((): Element => getByText('countryOfResidence.countries-1'));
        await fireEvent.click(getByText('countryOfResidence.countries-1'));
        await fireEvent.click(getByLabelText('countryIndentifyAs.options-0'));
        await fireEvent.change(container.querySelector("input[name='raceOrEthnicity']"), { target: { value: 'jedi' } });

        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(mutationMock).toBeCalledWith(result);
    });
});
