import { render, cleanup, fireEvent, act, wait } from '@testing-library/react';
import React, { TextareaHTMLAttributes } from 'react';
import FileDetailsForm from './FileDetailsForm';
import routerWrapper from '../../../test-utils/routerWrapper';

const mutationMock = jest.fn();

jest.mock('../utils/autosave-decorator', () => ({
    AutoSaveDecorator: (cb: () => void): void => cb(),
}));
jest.mock('@apollo/react-hooks', () => ({
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
}));

const createFile = (type: string, fileName: string): File =>
    new File([JSON.stringify({ ping: true })], fileName, { type });

describe('File Details Form', (): void => {
    beforeEach(() => {
        mutationMock.mockImplementation(
            () =>
                new Promise(resolve =>
                    resolve({
                        data: {
                            uploadManuscript: {
                                manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
                            },
                        },
                    }),
                ),
        );
    });
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<FileDetailsForm initialValues={{ id: 'test' }} />);
        }).not.toThrow();
    });
    describe('coverLetter', () => {
        it('sets coverletter initial value to initialValues.coverLetter on load', async (): Promise<void> => {
            const { container } = render(
                <FileDetailsForm initialValues={{ id: 'test', coverLetter: 'some default value' }} />,
            );
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('some default value');
        });

        it('sets coverletter initial value to empty string if no initialValues.coverLetter on load', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);
            expect(
                (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
            ).toBe('');
        });

        it('should call the save mutation with correct variables when cover letter is changed', async (): Promise<
            void
        > => {
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);
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
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);
            expect(container.querySelector('.file-upload__dropzone--idle')).toBeInTheDocument();
        });
        it('should display a complete file upload if a file is stored', () => {
            const { container } = render(
                <FileDetailsForm
                    initialValues={{
                        id: 'test',
                        manuscriptFile: { filename: 'testfile.pdf', url: 'http://localhost/file.pdf' },
                    }}
                />,
            );
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
            expect(container.querySelector('.file-upload__extra').textContent).toBe('testfile.pdf');
        });
        it('should display inprogress upload when file dropped', async (): Promise<void> => {
            let mutationResolve: (value?: unknown) => void;
            const mutationPromise = new Promise(resolve => {
                mutationResolve = resolve;
            });
            mutationMock.mockImplementation(() => mutationPromise);

            const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);

            const dropzone = container.querySelector('.file-upload__dropzone');
            await dropFileEvent(createFile('application/pdf', 'file.pdf'), dropzone);

            expect(container.querySelector('.file-upload__dropzone--uploading')).toBeInTheDocument();
            mutationResolve({
                data: {
                    uploadManuscript: {
                        manuscriptFile: { url: 'http://localhost/file.pdf', filename: 'testfile.pdf' },
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

            const { container, getByText } = render(<FileDetailsForm initialValues={{ id: 'test' }} />, {
                wrapper: routerWrapper(),
            });

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
            const { container, getByText } = render(<FileDetailsForm initialValues={{ id: 'test' }} />, {
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
            const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');

            await dropFileEvent(createFile('application/pdf', 'file1.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();

            await dropFileEvent(createFile('application/pdf', 'file2.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });

        it('Should clear status when a new file is dropped', async (): Promise<void> => {
            const { container, getByText } = render(<FileDetailsForm initialValues={{ id: 'test' }} />, {
                wrapper: routerWrapper(),
            });

            const dropzone = container.querySelector('.file-upload__dropzone');

            await dropFileEvent(createFile('image/png', 'file1.png'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--error')).toBeInTheDocument();
            expect(getByText('file-upload.error-extra.validation')).toBeInTheDocument();

            await dropFileEvent(createFile('application/pdf', 'file2.pdf'), dropzone);
            expect(container.querySelector('.file-upload__dropzone--complete')).toBeInTheDocument();
        });
    });
});
