import { render, cleanup } from '@testing-library/react';
import React from 'react';
import FileDetailsForm from './FileDetailsForm';

describe('File Details Form', (): void => {
    afterEach(cleanup);
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<FileDetailsForm />);
        }).not.toThrow();
    });
});
