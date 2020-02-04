import { cleanup, render, fireEvent, RenderResult, waitForElement } from '@testing-library/react';
import ArticleType from './ArticleType';
import React from 'react';

describe('SubmissonWizard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult => render(<ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} />),
        ).not.toThrow();
    });

    it('should render the default Research Article', (): void => {
        const { container, getByText } = render(<ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} />);
        expect(container.querySelector('.select-field__single-value').textContent).toBe('research-article.label');
        expect(getByText('research-article.paragraph-1')).toBeInTheDocument();
    });

    it('should switch to the correct copy', async (): Promise<void> => {
        const { container, getByText } = render(<ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} />);
        fireEvent.keyDown(container.querySelector('.select-field'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('feature-article.label'));
        fireEvent.click(getByText('feature-article.label'));
        expect(container.querySelector('.select-field__single-value').textContent).toBe('feature-article.label');
        expect(getByText('feature-article.paragraph-1')).toBeInTheDocument();
    });

    it('should call the cancel callback', (): void => {
        const callback = jest.fn();
        const { getByText } = render(<ArticleType onCancel={callback} onConfirm={(): void => {}} />);
        fireEvent.click(getByText('cancel-button'));
        expect(callback).toHaveBeenCalled();
    });

    it('should call the confirm callback with the default article type as the argument', (): void => {
        const callback = jest.fn();
        const { getByText } = render(<ArticleType onConfirm={callback} onCancel={(): void => {}} />);
        fireEvent.click(getByText('confirm-button'));
        expect(callback).toHaveBeenCalledWith('researchArticle');
    });

    it('should call the callback with the selected article type as the argument', async (): Promise<void> => {
        const callback = jest.fn();
        const { container, getByText } = render(<ArticleType onConfirm={callback} onCancel={(): void => {}} />);
        fireEvent.keyDown(container.querySelector('.select-field'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('feature-article.label'));
        fireEvent.click(getByText('feature-article.label'));
        fireEvent.click(getByText('confirm-button'));
        expect(callback).toHaveBeenCalledWith('featureArticle');
    });
});
