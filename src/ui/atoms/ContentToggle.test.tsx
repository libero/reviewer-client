import React from 'react';
import ContentToggle from './ContentToggle';
import { cleanup, render, RenderResult } from '@testing-library/react';

describe('ContentToggle', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <ContentToggle id="" collapsedText="" openText="">
                        This is some text
                    </ContentToggle>,
                ),
        ).not.toThrow();
    });

    it('should render correctly with all Props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <ContentToggle
                        id="ContentToggle"
                        collapsedText="This is some collapsed text"
                        openText="This is some open text"
                    >
                        This is some text
                    </ContentToggle>,
                ),
        ).not.toThrow();
    });

    it('should show if Content Toggle is closed', (): void => {
        const { container } = render(<ContentToggle id="test" openText="Test" collapsedText="test"></ContentToggle>);
        expect(container.querySelector('.select-toggle')).toBeInTheDocument();
    });

    it('should show if Content Toggle is open with content', (): void => {
        const { container } = render(
            <ContentToggle id="test" openText="Test" collapsedText="test" open>
                This is some text
            </ContentToggle>,
        );
        expect(container.querySelector('.select-toggle')).toBeInTheDocument();
    });
});
