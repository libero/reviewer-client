import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';

import NoSubmissions from './NoSubmissions';

describe('NoSubmissions', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<NoSubmissions startSubmission={(): void => {}} />)).not.toThrow();
    });
});
