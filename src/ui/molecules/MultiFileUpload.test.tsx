import React from 'react';
import { RenderResult, render, cleanup, fireEvent } from '@testing-library/react';
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

    it('should pass an array of 1 file to onUpload', async (): Promise<void> => {
        const onUploadMock = jest.fn();
        const { container } = render(<MultiFileUpload onUpload={onUploadMock} onDelete={jest.fn()} />);
        const file = new File(['§§§'], 'supercoolfile.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        expect(onUploadMock).toBeCalledTimes(0);
        Object.defineProperty(fileInput, 'files', {
            value: [file],
        });

        await fireEvent.change(fileInput);
        expect(onUploadMock).toBeCalledTimes(1);
        expect(onUploadMock.mock.calls[0][0]).toHaveLength(1);
        expect(onUploadMock.mock.calls[0][0][0].name).toBe('supercoolfile.png');
    });

    it('should pass an array of multiple files to onUpload', async (): Promise<void> => {
        const onUploadMock = jest.fn();
        const { container } = render(<MultiFileUpload onUpload={onUploadMock} onDelete={jest.fn()} />);
        const file = new File(['§§§'], 'supercoolfile.png', { type: 'image/png' });
        const file2 = new File(['-'], 'supercoolfile2.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        expect(onUploadMock).toBeCalledTimes(0);
        Object.defineProperty(fileInput, 'files', {
            value: [file, file2],
        });

        await fireEvent.change(fileInput);
        expect(onUploadMock).toBeCalledTimes(1);
        expect(onUploadMock.mock.calls[0][0]).toHaveLength(2);
        expect(onUploadMock.mock.calls[0][0][0].name).toBe('supercoolfile.png');
        expect(onUploadMock.mock.calls[0][0][1].name).toBe('supercoolfile2.png');
    });

    it('should display a FileItem per file passed', (): void => {
        const { container, rerender } = render(
            <MultiFileUpload
                files={[{ uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } }]}
                onUpload={jest.fn()}
                onDelete={jest.fn()}
            />,
        );
        expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(1);
        rerender(
            <MultiFileUpload
                files={[
                    { uploadInProgress: { fileName: 'File 1.pdf', progress: 42 } },
                    { fileStored: { fileName: 'File 2.pdf', id: '1' } },
                    { fileStored: { fileName: 'File 3.pdf', id: '2' } },
                ]}
                onUpload={jest.fn()}
                onDelete={jest.fn()}
            />,
        );
        expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(3);
    });

    describe('FileItem', (): void => {
        it('shows the correct UploadProgress for each item', () => {
            const { container } = render(
                <MultiFileUpload
                    files={[
                        { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } },
                        { fileStored: { fileName: 'File 2.pdf', id: '1' } },
                        { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 }, error: 'server' },
                    ]}
                    onUpload={jest.fn()}
                    onDelete={jest.fn()}
                />,
            );

            const items = container.querySelectorAll('.multifile-upload__upload-list-item');
            expect(items[0].querySelector('.upload-progress--uploading')).toBeInTheDocument();
            expect(items[1].querySelector('.upload-progress--complete')).toBeInTheDocument();
            expect(items[2].querySelector('.upload-progress--error')).toBeInTheDocument();
        });

        it('gives the correct multifile-upload__file-name--${status}', () => {
            const { container } = render(
                <MultiFileUpload
                    files={[
                        { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } },
                        { fileStored: { fileName: 'File 2.pdf', id: '1' } },
                        { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 }, error: 'server' },
                    ]}
                    onUpload={jest.fn()}
                    onDelete={jest.fn()}
                />,
            );
            const items = container.querySelectorAll('.multifile-upload__upload-list-item');
            expect(items[0].querySelector('.multifile-upload__file-name--uploading')).toBeInTheDocument();
            expect(items[1].querySelector('.multifile-upload__file-name--complete')).toBeInTheDocument();
            expect(items[2].querySelector('.multifile-upload__file-name--error')).toBeInTheDocument();
        });
    });
});
