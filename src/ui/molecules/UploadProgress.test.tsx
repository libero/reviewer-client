import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import UploadProgress from './UploadProgress';

describe('UploadProgress', (): void => {
    it('should render correctly', (): void => {
        expect((): RenderResult => render(<UploadProgress />)).not.toThrow();
    });
    it('should render correctly with all props', () => {
        expect((): RenderResult => render(<UploadProgress progress={100} />)).not.toThrow();
    });

    it('adds a class of progress--${progress}', () => {
        const { container, rerender } = render(<UploadProgress progress={100} />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
        rerender(<UploadProgress progress={50} />);
        expect(container.querySelector('.progress--50')).toBeInTheDocument();
    });
});
