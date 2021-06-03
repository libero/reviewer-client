import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import ContentToggle from './ContentToggle';

describe('ContentToggle', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<ContentToggle id="" collapsedText="" openText=""></ContentToggle>),
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
            <ContentToggle id="test" openText={openText} collapsedText="" open></ContentToggle>,
        );
        expect(getByText(openText)).toBeInTheDocument();
    });

    it('should render collapsedText content correctly', (): void => {
        const collapsedText = 'Add secondary country of residence/affiliation';
        const { getByText } = render(
            <ContentToggle id="test" openText="" collapsedText={collapsedText}></ContentToggle>,
        );
        expect(getByText(collapsedText)).toBeInTheDocument();
    });

    it('should not show content if collapsed', (): void => {
        const { container } = render(
            <ContentToggle id="test" openText="" collapsedText="">
                <span id="testTwo"></span>
            </ContentToggle>,
        );
        expect(container.querySelector('#testTwo')).toBeNull();
    });

    it('should show content if expanded', (): void => {
        const { container } = render(
            <ContentToggle id="test" openText="" collapsedText="" open>
                <span id="testTwo"></span>
            </ContentToggle>,
        );
        expect(container.querySelector('#testTwo')).toBeInTheDocument();
    });

    it('should expand when clicked', (): void => {
        const { container } = render(
            <ContentToggle
                id="test"
                openText="Remove secondary country of residence/affiliation"
                collapsedText="Add secondary country of residence/affiliation"
            >
                <span id="testTwo"></span>
            </ContentToggle>,
        );

        fireEvent.click(container.querySelector('.content-toggle__toggle-btn'));
        expect(container.querySelector('#testTwo')).toBeInTheDocument();
    });

    it('should collapse when clicked', (): void => {
        const { container } = render(
            <ContentToggle
                id="test"
                openText="Remove secondary country of residence/affiliation"
                collapsedText="Add secondary country of residence/affiliation"
                open
            >
                <span id="testTwo"></span>
            </ContentToggle>,
        );

        fireEvent.click(container.querySelector('.content-toggle__toggle-btn'));
        expect(container.querySelector('#testTwo')).toBeNull();
    });
});
