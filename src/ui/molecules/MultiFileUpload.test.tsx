import React from 'react';
import { RenderResult, render, cleanup } from '@testing-library/react';
import MultiFileUpload from './MultiFileUpload';

describe('MultiFileUpload', () => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<MultiFileUpload onUpload={jest.fn()} onDelete={jest.fn()} />)).not.toThrow();
    });

    it('should render correctly with all props', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <MultiFileUpload
                        files={[{ uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } }]}
                        onUpload={jest.fn()}
                        onDelete={jest.fn()}
                    />,
                ),
        ).not.toThrow();
    });

    it('should display the correct text when it has files', () => {
        const { getByText } = render(
            <MultiFileUpload
                files={[{ uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } }]}
                onUpload={jest.fn()}
                onDelete={jest.fn()}
            />,
        );
        expect(getByText('multifile-upload.label-files')).toBeInTheDocument();
    });

    it('should display the correct text when it has no files', () => {
        const { getByText } = render(<MultiFileUpload onUpload={jest.fn()} onDelete={jest.fn()} />);
        expect(getByText('multifile-upload.label-no-files')).toBeInTheDocument();
    });

    it('should display a files list if there are files', () => {
        const { container } = render(
            <MultiFileUpload
                onUpload={jest.fn()}
                onDelete={jest.fn()}
                files={[{ uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } }]}
            />,
        );
        expect(container.querySelector('.multifile-upload__upload-list')).toBeInTheDocument();
    });

    it('should not display a files list if there are no files', () => {
        const { container } = render(<MultiFileUpload onUpload={jest.fn()} onDelete={jest.fn()} />);
        expect(container.querySelector('.multifile-upload__upload-list')).not.toBeInTheDocument();
    });
});
