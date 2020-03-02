import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import MultiFileUpload from './MultiFileUpload';

describe('MultiFileUpload', () => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<MultiFileUpload onUpload={jest.fn()} onDelete={jest.fn()} />)).not.toThrow();
    });
});
