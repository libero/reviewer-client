import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import Toggle from './Toggle';

describe('ToggleComponent', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Toggle id="testId" toggleLabel="label" />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <Toggle id="testId" toggleLabel="label" open={true}>
                        test
                    </Toggle>,
                ),
        ).not.toThrow();
    });
});
