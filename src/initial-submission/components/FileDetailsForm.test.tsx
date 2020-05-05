import '../../../test-utils/i18n-mock';
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import React, { TextareaHTMLAttributes, useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';
import routerWrapper from '../../../test-utils/routerWrapper';

//TODO: put this in config
const maxSupportingFiles = 10;

const mutationMock = jest.fn();
let subscriptionData: {};
const testInitialValues = { id: 'test', updated: Date.now(), articleType: '' };

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

const testButton = ({ triggerValidation }: { _: Function; triggerValidation: () => Promise<boolean> }): JSX.Element => (
    <button
        onClick={(): void => {
            triggerValidation();
        }}
    >
        TEST BUTTON
    </button>
);

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
    beforeEach(() => (subscriptionData = { data: null, loading: false }));
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<FileDetailsForm initialValues={testInitialValues} />);
        }).not.toThrow();
    });
    describe('coverLetter', () => {
        it('sets coverletter initial value to initialValues.coverLetter on load', async (): Promise<void> => {
            const { container } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        files: { coverLetter: 'some default value' },
                        updated: Date.now(),
                        articleType: '',
                    }}
                />,
            );
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('some default value');
        });

        it('sets coverletter initial value to empty string if no initialValues.coverLetter on load', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />);
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('');
        });

        it('should call the save mutation with correct variables when cover letter is changed', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />);
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

        it('shows validation message if left empty', async (): Promise<void> => {
            const { getByText } = render(
                <FileDetailsForm initialValues={testInitialValues} ButtonComponent={testButton} />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => expect(getByText('files.validation.coverletter-required')).toBeInTheDocument());
        });
        it('shows no errors if coverletter has a value', async (): Promise<void> => {
            const { getByText } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        files: { coverLetter: 'some default value' },
                        updated: Date.now(),
                        articleType: '',
                    }}
                    ButtonComponent={testButton}
                />,
            );
            fireEvent.click(getByText('TEST BUTTON'));
            await waitFor(() => {});
            expect(() => getByText('files.validation.coverletter-required')).toThrow();
        });
    });

    describe('Manuscript Upload', () => {
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
        });
        afterEach(() => {
            mutationMock.mockReset();
        });
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
            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />);
            expect(container.querySelector('.file-upload__dropzone--idle')).toBeInTheDocument();
        });
        it('should display a complete file upload if a file is stored', () => {
            const { container } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        articleType: '',
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
        it('should display in processing when file dropped', async (): Promise<void> => {
            let mutationResolve: (value?: unknown) => void;
            const mutationPromise = new Promise(resolve => {
                mutationResolve = resolve;
            });
            mutationMock.mockImplementation(() => mutationPromise);

            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);

            expect(container.querySelector('.file-upload__dropzone--processing')).toBeInTheDocument();
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
            await waitFor(() => {});
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            expect(container.querySelector('.file-upload__extra').textContent).toBe('testfile.pdf');
        });

        it('Should display a server error message if the upload request fails', async (): Promise<void> => {
            let mutationReject: (error?: unknown) => void;
            const mutationPromise = new Promise((_, reject) => {
                mutationReject = reject;
            });
            mutationMock.mockImplementation(() => mutationPromise);

            const { container, getByText } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--processing')).toBeInTheDocument();
            mutationReject();
            // need to wait to flush mutation resolve through
            await waitFor(() => {});
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.server')).toBeInTheDocument();
        });

        it('Should display a validation error if the upload file is of the wrong file type', async (): Promise<
            void
        > => {
            const { container, getByText } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

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
            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');

            await dropFileEvent(createFile('application/pdf', 'file1.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();

            await dropFileEvent(createFile('application/pdf', 'file2.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });

        it('Should clear status when a new file is dropped', async (): Promise<void> => {
            const { container, getByText } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

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
            const { container } = render(<FileDetailsForm initialValues={testInitialValues} />, {
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

            // check before mutation resolves, otherwise percentage will have disapeared
            expect(container.querySelector('.file-upload__progress-percentage').textContent).toBe('45%');

            mutationResolve({
                data: {
                    uploadManuscript: {
                        manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                    },
                },
            });
            await waitFor(() => {});
        });
    });

    describe('SupportingFiles', () => {
        beforeEach(() => {
            mutationMock.mockImplementation(
                () =>
                    new Promise(resolve => {
                        resolve({
                            data: {
                                uploadSupportingFile: {
                                    files: {
                                        supportingFiles: [
                                            { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                                        ],
                                    },
                                },
                            },
                        });
                    }),
            );
        });
        afterEach(() => {
            mutationMock.mockReset();
        });
        it('displays initialValues supporting files on load', () => {
            const { container, getByText } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        updated: Date.now(),
                        articleType: '',
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
            const { container, getByText } = render(<FileDetailsForm initialValues={testInitialValues} />, {
                wrapper: routerWrapper(),
            });

            const file = new File(['§§§'], 'supercoolfile.png', { type: 'image/png' });
            const fileInput = container.querySelector('.multifile-upload__input');
            Object.defineProperty(fileInput, 'files', {
                value: [file],
            });
            await act(async () => await fireEvent.change(fileInput));
            expect(getByText('supercoolfile.png')).toBeInTheDocument();
        });

        it('puts a single supporting file into done state when mutation resolves', async (): Promise<void> => {
            let mutationResolve: (value?: unknown) => void;
            const mutationPromise = new Promise(resolve => {
                mutationResolve = resolve;
            });

            mutationMock.mockImplementation(() => mutationPromise);
            const { container } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now(), articleType: '' }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            const file = new File(['§§§'], 'supercoolfile.png', { type: 'image/png' });
            const fileInput = container.querySelector('.multifile-upload__input');
            Object.defineProperty(fileInput, 'files', {
                value: [file],
            });
            await act(async () => await fireEvent.change(fileInput));
            expect(container.querySelector('.multifile-upload__file-name--complete')).toBeNull();
            expect(container.querySelector('.multifile-upload__file-status--processing')).toBeInTheDocument();
            mutationResolve({
                data: {
                    uploadSupportingFile: {
                        url: 'http://localhost/file.pdf',
                        filename: 'testfile.pdf',
                        id: 'bob',
                    },
                },
            });
            await waitFor(() => {});
            expect(container.querySelector('.multifile-upload__file-name--complete')).toBeInTheDocument();
        });

        it('should call the delete mutation with the correct id when the delete icon is clicked', async (): Promise<
            void
        > => {
            mutationMock.mockImplementation(() => Promise.resolve({ data: { deleteSupportingFile: 'penguin' } }));
            const { container } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        updated: Date.now(),
                        articleType: '',
                        files: {
                            supportingFiles: [
                                { id: 'penguin', url: 'http://placekitten.com/400/400', filename: 'penguin.pdf' },
                            ],
                        },
                    }}
                />,
                {
                    wrapper: routerWrapper(),
                },
            );
            expect(container.querySelector('.multifile-upload__file-name--complete')).toBeInTheDocument();
            fireEvent.click(container.querySelector('.multifile-upload__delete'));
            expect(mutationMock).toHaveBeenCalledTimes(1);
            expect(mutationMock).toHaveBeenCalledWith({ variables: { fileId: 'penguin', submissionId: 'test' } });
        });

        describe('only allows for ${maxSupportingFiles}', () => {
            it('when there are no existing supporting files', async (): Promise<void> => {
                // this test only needs files in pending state so don't resolve promise.
                mutationMock.mockImplementation(() => new Promise(() => {}));
                const { container } = render(<FileDetailsForm initialValues={testInitialValues} />, {
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
                await act(async () => await fireEvent.change(fileInput));
                expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(
                    maxSupportingFiles,
                );
            });
            it('when there are existing supporting files', async (): Promise<void> => {
                // this test only needs files in pending state so don't resolve promise.
                mutationMock.mockImplementation(() => new Promise(() => {}));
                const { container } = render(
                    <FileDetailsForm
                        initialValues={{
                            id: 'test',
                            updated: Date.now(),
                            articleType: '',
                            files: {
                                supportingFiles: [
                                    {
                                        filename: 'File1.png',
                                        id: 'bob',
                                    },
                                    {
                                        filename: 'File2.png',
                                        id: 'mel',
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
                await act(async () => await fireEvent.change(fileInput));
                expect(container.querySelectorAll('.multifile-upload__upload-list-item')).toHaveLength(
                    maxSupportingFiles,
                );
            });
        });
        it('displays max files message when max files is reached', async (): Promise<void> => {
            const { container, getByText } = render(
                <FileDetailsForm initialValues={{ id: 'test', updated: Date.now(), articleType: '' }} />,
                {
                    wrapper: routerWrapper(),
                },
            );

            expect(() => getByText('files.supporting-files-max')).toThrow();

            const file = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
            const fileInput = container.querySelector('.multifile-upload__input');

            Object.defineProperty(fileInput, 'files', {
                value: Array(maxSupportingFiles).fill(file),
            });

            await act(async () => await fireEvent.change(fileInput));

            expect(getByText('files.supporting-files-max')).toBeInTheDocument();
        });
    });
});
