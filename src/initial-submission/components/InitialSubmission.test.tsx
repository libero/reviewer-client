import { cleanup, render, RenderResult } from '@testing-library/react';
import InitialSubmission from './InitialSubmission';
import React from 'react';

describe('InitialSubmission', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<InitialSubmission />)).not.toThrow();
    });
});
