import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';
import routerWrapper from '../../../test-utils/routerWrapper';
import { act } from 'react-dom/test-utils';

describe('FileUpload', (): void => {
    afterEach(cleanup);
    describe('Idle state', () => {
        it('should render correctly', (): void => {
            expect((): RenderResult => render(<FileUpload onUpload={(): void => {}} />)).not.toThrow();
        });

        it('should not have the error classes when in idle state', () => {
            const { container } = render(<FileUpload onUpload={jest.fn} />);
            expect(container.querySelector('.file-upload__error-prefix')).not.toBeInTheDocument();
        });

        it('should display the correct text when idle', () => {
            const { getByText } = render(<FileUpload onUpload={jest.fn} />);
            expect(getByText('file-upload.idle-upload')).toBeInTheDocument();
            expect(getByText('file-upload.idle-message')).toBeInTheDocument();
            expect(getByText('file-upload.idle-extra')).toBeInTheDocument();
        });
    });

    describe('Uploading state', () => {
        it('should render correctly', (): void => {
            expect(
                (): RenderResult =>
                    render(
                        <FileUpload
                            state={{ uploadInProgress: { fileName: 'bob', progress: 42 } }}
                            onUpload={(): void => {}}
                        />,
                    ),
            ).not.toThrow();
        });

        it('should have the processing class for the border', () => {
            const { container } = render(
                <FileUpload state={{ uploadInProgress: { fileName: 'bob', progress: 0 } }} onUpload={jest.fn} />,
            );
            expect(container.querySelector('.file-upload__dropzone--processing')).toBeInTheDocument();
        });

        // less than ideal way of waiting for science beam to be done.
        it('should have the processing class for the border', () => {
            const { container } = render(
                <FileUpload state={{ uploadInProgress: { fileName: 'bob', progress: 100 } }} onUpload={jest.fn} />,
            );
            expect(container.querySelector('.file-upload__dropzone--processing')).toBeInTheDocument();
        });

        it('should have the uploading class for the border', () => {
            const { container } = render(
                <FileUpload state={{ uploadInProgress: { fileName: 'bob', progress: 42 } }} onUpload={jest.fn} />,
            );
            expect(container.querySelector('.file-upload__dropzone--uploading')).toBeInTheDocument();
        });

        it('should display the correct text when in uploading', () => {
            const { getByText } = render(
                <FileUpload state={{ uploadInProgress: { fileName: 'bob', progress: 42 } }} onUpload={jest.fn} />,
            );
            expect(getByText('file-upload.uploading-message')).toBeInTheDocument();
            expect(getByText('bob')).toBeInTheDocument();
            expect(getByText('42%')).toBeInTheDocument();
        });
    });

    describe('Error state', () => {
        it('should render correctly', (): void => {
            expect(
                (): RenderResult =>
                    render(<FileUpload state={{ error: 'server' }} onUpload={(): void => {}} />, {
                        wrapper: routerWrapper(),
                    }),
            ).not.toThrow();
        });

        it('should show validationErrors as an empty error state', () => {
            const { container, getByText } = render(<FileUpload onUpload={jest.fn} validationError="required" />);
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(container.querySelector('.file-upload__description').textContent).toContain(
                'file-upload.error-message.empty',
            );
            expect(getByText('file-upload.error-extra.empty')).toBeInTheDocument();
        });

        it('should have the error class for the border', () => {
            const { container } = render(<FileUpload state={{ error: 'server' }} onUpload={jest.fn} />, {
                wrapper: routerWrapper(),
            });
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
        });

        it('should display the correct text when in uploading', () => {
            const { getByText } = render(<FileUpload state={{ error: 'server' }} onUpload={jest.fn} />, {
                wrapper: routerWrapper(),
            });
            expect(getByText('file-upload.error-pre-content')).toBeInTheDocument();
            expect(getByText('file-upload.error-upload')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.server')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.contact-us.')).toBeInTheDocument(); // . here is deliberate
        });
    });

    describe('Complete state', () => {
        it('should render correctly', (): void => {
            expect(
                (): RenderResult =>
                    render(
                        <FileUpload
                            state={{ fileStored: { fileName: 'bob', previewLink: 'www.bob.com' } }}
                            onUpload={(): void => {}}
                        />,
                    ),
            ).not.toThrow();
        });

        it('should have the complete class for the border', () => {
            const { container } = render(
                <FileUpload
                    state={{ fileStored: { fileName: 'bob', previewLink: 'www.bob.com' } }}
                    onUpload={jest.fn}
                />,
            );
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });

        it('should display the correct text when complete', () => {
            const { getByText } = render(
                <FileUpload
                    state={{ fileStored: { fileName: 'bob.pdf', previewLink: 'www.bob.com' } }}
                    onUpload={jest.fn}
                />,
            );
            expect(getByText('file-upload.complete-prefix', { exact: false })).toBeInTheDocument();
            expect(getByText('file-upload.complete-preview')).toBeInTheDocument();
            expect(getByText('file-upload.complete-message', { exact: false })).toBeInTheDocument();
            expect(getByText('file-upload.complete-replace')).toBeInTheDocument();
            expect(getByText('file-upload.complete-suffix', { exact: false })).toBeInTheDocument();
            expect(getByText('bob.pdf')).toBeInTheDocument();
        });
    });

    describe('Drag and Drop', () => {
        async function dispatchEvt(node: Document | Element | Window, type: string, data: unknown): Promise<void> {
            const event = new Event(type, { bubbles: true });
            Object.assign(event, data);
            await fireEvent(node, event);
        }

        function mockData(files: File[]): Record<string, unknown> {
            return {
                dataTransfer: {
                    files,
                    items: files.map(
                        (file): Record<string, unknown> => ({
                            kind: 'file',
                            type: file.type,
                            getAsFile: (): File => file,
                        }),
                    ),
                    types: ['Files'],
                },
            };
        }

        it('should render the correct content when dragging', async (): Promise<void> => {
            const { container } = render(<FileUpload onUpload={(): void => {}} />);
            const dropzone = container.querySelector('.file-upload__dropzone');
            const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
            const data = mockData([file]);

            await act(
                async (): Promise<void> => {
                    await dispatchEvt(dropzone, 'dragenter', data);
                },
            );

            expect(container.querySelector('.file-upload__dropzone--drag-active')).toBeInTheDocument();
        });

        it('should render render the default content on dragleave', async (): Promise<void> => {
            const { container } = render(<FileUpload onUpload={(): void => {}} />);
            const dropzone = container.querySelector('.file-upload__dropzone');
            const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
            const data = mockData([file]);

            await act(
                async (): Promise<void> => {
                    await dispatchEvt(dropzone, 'dragenter', data);
                },
            );

            expect(container.querySelector('.file-upload__dropzone--drag-active')).toBeInTheDocument();

            await act(
                async (): Promise<void> => {
                    await dispatchEvt(dropzone, 'dragleave', data);
                },
            );

            expect(container.querySelector('.file-upload__dropzone--drag-active')).not.toBeInTheDocument();
        });

        it('call the callback when a file is dropped', async (): Promise<void> => {
            const mockUpload = jest.fn();
            const { container } = render(<FileUpload onUpload={mockUpload} />);
            const dropzone = container.querySelector('.file-upload__dropzone');
            const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });
            const data = mockData([file]);

            await act(
                async (): Promise<void> => {
                    await dispatchEvt(dropzone, 'drop', data);
                },
            );

            expect(mockUpload).toHaveBeenCalledTimes(1);
        });
    });
});
