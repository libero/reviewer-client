import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import UploadProgress from './UploadProgress';

describe('UploadProgress', (): void => {
    beforeEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<UploadProgress />)).not.toThrow();
    });
    it('should render correctly with all props', () => {
        expect(
            (): RenderResult => render(<UploadProgress progress={100} status="COMPLETE" small={true} />),
        ).not.toThrow();
    });

    it('adds a class of progress--${progress} when in the UPLOADING state', () => {
        const { container, rerender } = render(<UploadProgress progress={100} status="UPLOADING" />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
        rerender(<UploadProgress progress={50} status="UPLOADING" />);
        expect(container.querySelector('.progress--50')).toBeInTheDocument();
    });
    it('renders a check when in COMPLETE state', (): void => {
        const { container } = render(<UploadProgress progress={100} status="COMPLETE" />);
        expect(container.querySelector('svg.upload-progress__icon--success')).toBeInTheDocument();
    });
    it('shows complete progress circle on COMPLETE state', () => {
        const { container, rerender } = render(<UploadProgress progress={100} status="COMPLETE" />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
        rerender(<UploadProgress progress={50} status="COMPLETE" />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
    });
    it('renders a cross when in ERROR state', (): void => {
        const { container } = render(<UploadProgress progress={100} status="ERROR" />);
        expect(container.querySelector('svg.upload-progress__icon--error')).toBeInTheDocument();
    });
    it('shows complete progress circle on ERROR state', () => {
        const { container, rerender } = render(<UploadProgress progress={100} status="ERROR" />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
        rerender(<UploadProgress progress={50} status="ERROR" />);
        expect(container.querySelector('.progress--100')).toBeInTheDocument();
    });
    it('shows empty progress circle on IDLE state', () => {
        const { container, rerender } = render(<UploadProgress progress={0} status="IDLE" />);
        expect(container.querySelector('.progress--0')).toBeInTheDocument();
        rerender(<UploadProgress progress={0} status="IDLE" />);
        expect(container.querySelector('.progress--0')).toBeInTheDocument();
    });

    it('adds a upload-progress--small class when small prop passed', () => {
        const { container } = render(<UploadProgress small={true} />);
        expect(container.querySelector('.upload-progress--small')).toBeInTheDocument();
    });
});
