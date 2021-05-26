import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ContentToggle from './ContentToggle';

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

    it('should render openText content correctly', (): void => {
        const openText = 'Remove secondary country of residence/affiliation';
        const { getByText } = render(
            <ContentToggle id="test" openText={openText} collapsedText="This is some closed text" open></ContentToggle>,
        );
        expect(getByText(openText)).toBeInTheDocument();
    });

    it('should render collapsedText content correctly', (): void => {
        const collapsedText = 'Add secondary country of residence/affiliation';
        const { getByText } = render(
            <ContentToggle id="test" openText="Test" collapsedText={collapsedText}></ContentToggle>,
        );
        expect(getByText(collapsedText)).toBeInTheDocument();
    });

    it('should show if Content Toggle is closed with no content', (): void => {
        const { container } = render(<ContentToggle id="test" openText="Test" collapsedText="test"></ContentToggle>);
        expect(container.querySelector('.select-toggle')).toBeInTheDocument();
    });

    it('should show if Content Toggle is closed with content', (): void => {
        const { container } = render(
            <ContentToggle id="test" openText="Test" collapsedText="test">
                This is some text
            </ContentToggle>,
        );
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
