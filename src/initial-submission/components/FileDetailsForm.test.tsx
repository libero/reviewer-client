import { render, cleanup, fireEvent, act, wait } from '@testing-library/react';
import React, { TextareaHTMLAttributes, useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';
import routerWrapper from '../../../test-utils/routerWrapper';

//TODO: put this in config
const maxSupportingFiles = 10;

const mutationMock = jest.fn();
let subscriptionData: {};

jest.mock('../hooks/useAutoSave', () => (cb: () => void, deps: DependencyList): void => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            cb();
        } else {
            initialRender.current = false;
        }
    }, deps);
});

jest.mock('@apollo/react-hooks', () => ({
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
    useSubscription: (): object => {
        return {
            data: subscriptionData,
            loading: false,
        };
    },
}));

const createFile = (type: string, fileName: string): File =>
    new File([JSON.stringify({ ping: true })], fileName, { type });

describe('File Details Form', (): void => {
    const originalError = console.error;
    beforeAll(() => {
        // This is horrible but necessary to prevent console error output which isn't to do with the test scenarios see: https://github.com/libero/reviewer-client/issues/69
        console.error = (...args: unknown[]): void => {
            if (/connect ECONNREFUSED 127.0.0.1:80/.test(args[0] as string)) {
                console.warn(
                    'Suppressed connection refused console error see https://github.com/libero/reviewer-client/issues/69 for context.',
                );
                return;
            }
            originalError.call(console, ...args);
        };
    });
    beforeEach(() => {
        mutationMock.mockImplementation(
            () =>
                new Promise(resolve =>
                    resolve({
                        data: {
                            uploadManuscript: {
                                files: {
                                    manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                                },
                            },
                        },
                    }),
                ),
        );
        subscriptionData = { data: null, loading: false };
    });
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />);
        }).not.toThrow();
    });
    describe('coverLetter', () => {
        it('sets coverletter initial value to initialValues.coverLetter on load', async (): Promise<void> => {
            const { container } = render(
                <FileDetailsForm
                    initialValues={{ id: 'test', files: { coverLetter: 'some default value' }, updated: Date.now() }}
                />,
            );
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('some default value');
        });

        it('sets coverletter initial value to empty string if no initialValues.coverLetter on load', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />);
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('');
        });

        it('should call the save mutation with correct variables when cover letter is changed', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />);
            fireEvent.input(container.querySelector('.cover-letter__input'), {
                target: { value: 'test cover letter input' },
            });
            expect(mutationMock).toBeCalledWith({
                variables: {
                    id: 'test',
                    coverLetter: 'test cover letter input',
                },
            });
        });
    });

    describe('Manuscript Upload', () => {
        const dropFileEvent = async (file: File, element: Element): Promise<void> => {
            await act(
                async (): Promise<void> => {
                    const event = new Event('drop', { bubbles: true });
                    Object.assign(event, {
                        dataTransfer: {
                            files: [file],
                            items: [
                                {
                                    kind: 'file',
                                    type: file.type,
                                    getAsFile: (): File => file,
                                },
                            ],
                            types: ['Files'],
                        },
                    });
                    fireEvent(element, event);
                },
            );
        };
        it('should display an idle file upload if no file stored', () => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />);
            expect(container.querySelector('.file-upload__dropzone--idle')).toBeInTheDocument();
        });
        it('should display a complete file upload if a file is stored', () => {
            const { container } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        updated: Date.now(),
                        files: {
                            manuscriptFile: { filename: 'testfile.pdf', url: 'http://localhost/file.pdf' },
                        },
                    }}
                />,
            );
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            expect(container.querySelector('.file-upload__extra').textContent).toBe('testfile.pdf');
        });
        it('should display in progress upload when file dropped', async (): Promise<void> => {
            let mutationResolve: (value?: unknown) => void;
            const mutationPromise = new Promise(resolve => {
                mutationResolve = resolve;
            });
            mutationMock.mockImplementation(() => mutationPromise);

            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);

            expect(container.querySelector('.file-upload__dropzone--uploading')).toBeInTheDocument();
            mutationResolve({
                data: {
                    uploadManuscript: {
                        files: {
                            manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                        },
                    },
                },
            });
            // need to wait to flush mutation resolve through
            await wait();
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            expect(container.querySelector('.file-upload__extra').textContent).toBe('testfile.pdf');
        });

        it('Should display a server error message if the upload request fails', async (): Promise<void> => {
            let mutationReject: (error?: unknown) => void;
            const mutationPromise = new Promise((_, reject) => {
                mutationReject = reject;
            });
            mutationMock.mockImplementation(() => mutationPromise);

            const { container, getByText } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--uploading')).toBeInTheDocument();
            mutationReject();
            // need to wait to flush mutation resolve through
            await wait();
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.server')).toBeInTheDocument();
        });

        it('Should display a validation error if the upload file is of the wrong file type', async (): Promise<
            void
        > => {
            const { container, getByText } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            const dropzone = container.querySelector('.file-upload__dropzone');

            // .pdf
            await dropFileEvent(createFile('application/pdf', 'ping.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            // .docx
            await dropFileEvent(
                createFile('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'ping.docx'),
                dropzone,
            );
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            // .doc
            await dropFileEvent(createFile('application/msword', 'ping.doc'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();

            // .png
            await dropFileEvent(createFile('image/png', 'ping.png'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.validation')).toBeInTheDocument();
        });

        it('Should allow a new file to be uploaded', async (): Promise<void> => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');

            await dropFileEvent(createFile('application/pdf', 'file1.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();

            await dropFileEvent(createFile('application/pdf', 'file2.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });

        it('Should clear status when a new file is dropped', async (): Promise<void> => {
            const { container, getByText } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            const dropzone = container.querySelector('.file-upload__dropzone');

            await dropFileEvent(createFile('image/png', 'file1.png'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.validation')).toBeInTheDocument();

            await dropFileEvent(createFile('application/pdf', 'file2.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });

        it('should display upload progress for manuscript file', async (): Promise<void> => {
            let mutationResolve: (value?: unknown) => void;
            const mutationPromise = new Promise(resolve => {
                mutationResolve = resolve;
            });

            mutationMock.mockImplementation(() => mutationPromise);
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />, {
                wrapper: routerWrapper(),
            });

            subscriptionData = {
                fileUploadProgress: {
                    type: 'MANUSCRIPT_SOURCE',
                    filename: 'file.pdf',
                    percentage: '45',
                },
            };

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);

            mutationResolve({
                data: {
                    uploadManuscript: {
                        manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                    },
                },
            });

            // check before mutation resolves, otherwise percentage will have disapeared
            expect(container.querySelector('.file-upload__progress-percentage').textContent).toBe('45%');
            await wait();
        });
    });

    describe('SupportingFiles upload', () => {
        it('displays initialValues supporting files on load', () => {
            const { container, getByText } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        updated: Date.now(),
                        files: {
                            supportingFiles: [
                                {
                                    filename: 'File1.png',
                                },
                                {
                                    filename: 'File2.png',
                                },
                            ],
                        },
                    }}
                />,
                {
                    wrapper: routerWrapper(),
                },
            );
            expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(2);
            expect(getByText('File1.png')).toBeInTheDocument();
            expect(getByText('File2.png')).toBeInTheDocument();
        });
        it('queues a selected file for upload', async (): Promise<void> => {
            const { container, getByText } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            const file = new File(['§§§'], 'supercoolfile.png', { type: 'image/png' });
            const fileInput = container.querySelector('.multifile-upload__input');
            Object.defineProperty(fileInput, 'files', {
                value: [file],
            });
            await fireEvent.change(fileInput);
            expect(getByText('supercoolfile.png')).toBeInTheDocument();
        });
        describe('only allows for ${maxSupportingFiles}', () => {
            it('when there are no existing supporting files', async (): Promise<void> => {
                const { container } = render(<FileDetailsForm initialValues={{ id: 'test', updated: Date.now() }} />, {
                    wrapper: routerWrapper(),
                });

                const fileList = [];
                for (let fileCount = 0; fileCount < maxSupportingFiles + 1; fileCount++) {
                    fileList.push(new File(['§§§'], `supercoolfile_${fileCount}.png`, { type: 'image/png' }));
                }
                expect(fileList.length).toBeGreaterThan(maxSupportingFiles);

                const fileInput = container.querySelector('.multifile-upload__input');
                Object.defineProperty(fileInput, 'files', {
                    value: fileList,
                });
                await fireEvent.change(fileInput);
                expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(
                    maxSupportingFiles,
                );
            });
            it('when there are existing supporting files', async (): Promise<void> => {
                const { container } = render(
                    <FileDetailsForm
                        initialValues={{
                            id: 'test',
                            updated: Date.now(),
                            files: {
                                supportingFiles: [
                                    {
                                        filename: 'File1.png',
                                    },
                                    {
                                        filename: 'File2.png',
                                    },
                                ],
                            },
                        }}
                    />,
                    {
                        wrapper: routerWrapper(),
                    },
                );
                expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(2);

                const fileList = [];
                for (let fileCount = 0; fileCount < maxSupportingFiles; fileCount++) {
                    fileList.push(new File(['§§§'], `supercoolfile_${fileCount}.png`, { type: 'image/png' }));
                }
                expect(fileList).toHaveLength(maxSupportingFiles);

                const fileInput = container.querySelector('.multifile-upload__input');
                Object.defineProperty(fileInput, 'files', {
                    value: fileList,
                });
                await fireEvent.change(fileInput);
                expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(
                    maxSupportingFiles,
                );
            });
        });
    });
});
