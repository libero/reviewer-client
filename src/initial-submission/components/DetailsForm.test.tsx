import React from 'react';
import { cleanup, render } from '@testing-library/react';
import DetailsForm from './DetailsForm';

describe('DetailsForm', (): void => {
    afterEach(cleanup);
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<DetailsForm />);
        }).not.toThrow();
    });
    it('toggles display of second cosubmission text input when text link is clicked', () => {
      // Click toggle cosubmission
      // Click findByText('details.second-cosubmission-toggle-link')
      // assert name=[secondCosubmissionTitle] is in doc 
    });
});
