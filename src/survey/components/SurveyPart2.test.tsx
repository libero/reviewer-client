import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import SurveyPart2 from './SurveyPart2';

describe('SurveyPart2', (): void => {
    beforeAll(() => {
        // NOTE: no support in jsdom for scrollIntoView, see https://github.com/jsdom/jsdom/issues/1695
        HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    afterEach(() => {
        cleanup();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart2 />);
        }).not.toThrow();
    });

    it('should by default hide gender self describe option', async (): Promise<void> => {
        const { queryByText } = render(<SurveyPart2 />);
        expect(queryByText('genderSelfDescribe.label')).toBeNull();
    });

    it('should show the gender self describe input', async (): Promise<void> => {
        const { getByLabelText, queryByText } = render(<SurveyPart2 />);
        fireEvent.click(getByLabelText('genderIdentity.options-3'));
        await waitFor(() => {});
        expect(queryByText('genderSelfDescribe.label')).not.toBeNull();
    });

    it('should by default have no initial values', async (): Promise<void> => {
        const { getByLabelText, getByPlaceholderText } = render(<SurveyPart2 />);
        const radioGenderIdentity = getByLabelText('genderIdentity.options-0') as HTMLInputElement;
        expect(radioGenderIdentity.checked).toBe(false);
        const selectCountryOfResidence = getByLabelText('countryOfResidence.label') as HTMLInputElement;
        expect(selectCountryOfResidence.value).toBe('');
        const radioCountryIndentifyAs = getByLabelText('countryIndentifyAs.options-0') as HTMLInputElement;
        expect(radioCountryIndentifyAs.checked).toBe(false);
        const textRaceOrEthnicity = getByPlaceholderText('raceOrEthnicity.placeholder') as HTMLInputElement;
        expect(textRaceOrEthnicity.value).toBe('');
    });

    it('should if specified have initial values', async (): Promise<void> => {
        const defaultValues = {
            genderIdentity: 'self-describe',
            genderSelfDescribe: 'popsicle',
            countryOfResidence: { label: 'USA', value: 'US' },
            secondCountryOfResidence: { label: 'United Kingdom', value: 'GB' },
            countryIndentifyAs: 'yes',
            raceOrEthnicity: 'jedi',
        };
        const { getByLabelText, getByPlaceholderText, container } = render(
            <SurveyPart2 defaultValues={defaultValues} />,
        );
        const radioGenderIdentity = getByLabelText('genderIdentity.options-3') as HTMLInputElement;
        expect(radioGenderIdentity.checked).toBe(true);
        const textGenderSelfDescribe = getByLabelText('genderSelfDescribe.label') as HTMLInputElement;
        expect(textGenderSelfDescribe.value).toBe('popsicle');
        const selectCountryOfResidence = container.querySelector(
            "input[name='countryOfResidence']",
        ) as HTMLInputElement;
        expect(selectCountryOfResidence.value).toBe('US');
        const selectSecondaryCountryOfResidence = container.querySelector(
            "input[name='secondCountryOfResidence']",
        ) as HTMLInputElement;
        expect(selectSecondaryCountryOfResidence.value).toBe('GB');
        const radioCountryIndentifyAs = getByLabelText('countryIndentifyAs.options-0') as HTMLInputElement;
        expect(radioCountryIndentifyAs.checked).toBe(true);
        const textRaceOrEthnicity = getByPlaceholderText('raceOrEthnicity.placeholder') as HTMLInputElement;
        expect(textRaceOrEthnicity.value).toBe('jedi');
    });

    it('should go back', async () => {
        const onPrevious = jest.fn();
        const { getByText } = render(<SurveyPart2 previous={onPrevious} />);
        fireEvent.click(getByText('navigation.back'));
        expect(onPrevious).toBeCalled();
    });

    it('should skip when form is empty', async () => {
        const onSkip = jest.fn();
        const { container } = render(<SurveyPart2 next={onSkip} />);
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(onSkip).toBeCalledWith({});
    });

    it('should not submit when form is invalid', async (): Promise<void> => {
        const defaultValues = {
            genderIdentity: 'self-describe',
            genderSelfDescribe: '',
        };
        const onSubmit = jest.fn();
        const { container } = render(<SurveyPart2 defaultValues={defaultValues} next={onSubmit} />);
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(onSubmit).not.toBeCalled();
    });

    it('should submit when form is dirty', async () => {
        const defaultValues = {
            genderIdentity: 'self-describe',
            genderSelfDescribe: 'popsicle',
            countryOfResidence: { label: 'USA', value: 'US' },
            secondCountryOfResidence: { label: 'USA', value: 'US' },
            countryIndentifyAs: 'yes',
            raceOrEthnicity: 'jedi',
        };
        const onSubmit = jest.fn();
        const { container } = render(<SurveyPart2 defaultValues={defaultValues} next={onSubmit} />);
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(onSubmit).toBeCalledWith(defaultValues);
    });
});
