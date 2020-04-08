import '../../../test-utils/i18n-mock';
import { cleanup, render, fireEvent, RenderResult, waitForElement } from '@testing-library/react';
import ArticleType from './ArticleType';
import React from 'react';

describe('SubmissionWizard', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} loading={false} />),
        ).not.toThrow();
    });

    it('should render the default Research Article', (): void => {
        const { container, getByText } = render(
            <ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} loading={false} />,
        );
        expect(container.querySelector('.select-field__single-value').textContent).toBe('research-article.label');
        expect(getByText('research-article.paragraph-1')).toBeInTheDocument();
    });

    it('should switch to the correct copy', async (): Promise<void> => {
        const { container, getByText } = render(
            <ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} loading={false} />,
        );
        fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('feature.label'));
        fireEvent.click(getByText('feature.label'));
        expect(container.querySelector('.select-field__single-value').textContent).toBe('feature.label');
        expect(getByText('feature.paragraph-1')).toBeInTheDocument();
    });

    it('should call the cancel callback', (): void => {
        const callback = jest.fn();
        const { getByText } = render(<ArticleType onCancel={callback} onConfirm={(): void => {}} loading={false} />);
        fireEvent.click(getByText('cancel-button'));
        expect(callback).toHaveBeenCalled();
    });

    it('should call the confirm callback with the default article type as the argument', (): void => {
        const callback = jest.fn();
        const { getByText } = render(<ArticleType onConfirm={callback} onCancel={(): void => {}} loading={false} />);
        fireEvent.click(getByText('confirm-button'));
        expect(callback).toHaveBeenCalledWith('research-article');
    });

    it('should call the callback with the selected article type as the argument', async (): Promise<void> => {
        const callback = jest.fn();
        const { container, getByText } = render(
            <ArticleType onConfirm={callback} onCancel={(): void => {}} loading={false} />,
        );
        fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'ArrowDown', keyCode: 40 });
        await waitForElement((): Element => getByText('feature.label'));
        fireEvent.click(getByText('feature.label'));
        fireEvent.click(getByText('confirm-button'));
        expect(callback).toHaveBeenCalledWith('feature');
    });

    it('should show the loading spinner when loading is set to true', (): void => {
        const { container } = render(
            <ArticleType onCancel={(): void => {}} onConfirm={(): void => {}} loading={true} />,
        );
        expect(container.querySelector('.button--primary .button__text')).toHaveClass('button--loading');
    });
});
