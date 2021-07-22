import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import SurveyPart1 from './SurveyPart1';

describe('SurveyPart1', (): void => {
    afterEach(() => {
        cleanup();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should by default hide the independent researcher year question', async (): Promise<void> => {
        const { queryByText } = render(<SurveyPart1 />);
        expect(queryByText('independentResearcherYear.label')).toBeNull();
    });

    it('should show independent researcher year question when required', async (): Promise<void> => {
        const { container, queryByText } = render(<SurveyPart1 />);
        fireEvent.click(container.querySelector('#independentResearcher-option-0'));
        await waitFor(() => {});
        expect(queryByText('independentResearcherYear.label')).not.toBeNull();
    });

    it('should by default have no initial values', async (): Promise<void> => {
        const { container } = render(<SurveyPart1 />);
        const radioSubmittingAs = container.querySelector('#submittingAs-option-0') as HTMLInputElement;
        expect(radioSubmittingAs.checked).toBe(false);
        const radioIndependentResearcher = container.querySelector(
            '#independentResearcher-option-0',
        ) as HTMLInputElement;
        expect(radioIndependentResearcher.checked).toBe(false);
    });

    it('should if specified have initial values', async (): Promise<void> => {
        const defaultValues = {
            submittingAs: 'first-author',
            independentResearcher: 'yes',
            independentResearcherYear: '1990',
        };
        const { container, getByLabelText } = render(<SurveyPart1 defaultValues={defaultValues} />);
        const radioSubmittingAs = container.querySelector('#submittingAs-option-0') as HTMLInputElement;
        expect(radioSubmittingAs.checked).toBe(true);
        const radioIndependentResearcher = container.querySelector(
            '#independentResearcher-option-0',
        ) as HTMLInputElement;
        expect(radioIndependentResearcher.checked).toBe(true);
        const textIndependentResearcherYear = getByLabelText('independentResearcherYear.label') as HTMLInputElement;
        expect(textIndependentResearcherYear.value).toBe('1990');
    });

    it('should change the button label when the form is dirty', async () => {
        const { container, getByText } = render(<SurveyPart1 />);
        expect(getByText('navigation.skip')).toBeInTheDocument();
        fireEvent.click(container.querySelector('#independentResearcher-option-0'));
        await waitFor(() => {});
        expect(getByText('navigation.next')).toBeInTheDocument();
    });

    it('should skip when form is empty', async () => {
        const onSkip = jest.fn();
        const { container } = render(<SurveyPart1 next={onSkip} />);
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(onSkip).toBeCalledWith({});
    });

    it('should submit date when the form is dirty', async () => {
        const defaultValues = {
            submittingAs: 'first-author',
            independentResearcher: 'yes',
            independentResearcherYear: '1990',
        };
        const onSubmit = jest.fn();
        const { container } = render(<SurveyPart1 defaultValues={defaultValues} next={onSubmit} />);
        await fireEvent.click(container.querySelector("button[type='submit']"));
        await waitFor(() => {});
        expect(onSubmit).toBeCalledWith(defaultValues);
    });
});
