import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import CoverLetter from './CoverLetter';

describe('CoverLetter', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<CoverLetter id="test" />)).not.toThrow();
    });
});
