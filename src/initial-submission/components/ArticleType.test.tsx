import { cleanup, render, fireEvent, RenderResult, waitForElement } from '@testing-library/react';
import ArticleType from './ArticleType';
import React from 'react';

describe('SubmissonWizard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<ArticleType />)).not.toThrow();
    });

    it('should render the default Research Article', (): void => {
        const { container, getByText } = render(<ArticleType />);
        expect(container.querySelector('.select-field__single-value').textContent).toBe('research-article.label');
        expect(getByText('research-article.paragraph-1')).toBeInTheDocument();
    });

    it('should switch to the correct copy', async (): Promise<void> => {
        const { container, getByText } = render(<ArticleType />);
        fireEvent.keyDown(container.querySelector('.select-field'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('feature-article.label'));
        fireEvent.click(getByText('feature-article.label'));
        expect(container.querySelector('.select-field__single-value').textContent).toBe('feature-article.label');
        expect(getByText('feature-article.paragraph-1')).toBeInTheDocument();
    });
});
