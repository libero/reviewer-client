import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import DetailsForm from './DetailsForm';

describe('DetailsForm', (): void => {
    afterEach(cleanup);
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<DetailsForm />);
        }).not.toThrow();
    });

    it('toggles display of second cosubmission text input when text link is clicked', () => {
        const { container, getByText, getByLabelText } = render(<DetailsForm />);
        expect(getByLabelText('details.cosubmission-toggle')).toBeInTheDocument();
        fireEvent.click(getByLabelText('details.cosubmission-toggle'));
        expect(getByText('details.second-cosubmission-toggle-link')).toBeInTheDocument();
        fireEvent.click(getByText('details.second-cosubmission-toggle-link'));
        expect(container.querySelector('#secondCosubmissionTitle')).toBeInTheDocument();
    });
});
