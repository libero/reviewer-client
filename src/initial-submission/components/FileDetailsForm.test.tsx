import { render, cleanup, fireEvent, act, wait } from '@testing-library/react';
import React, { TextareaHTMLAttributes } from 'react';
import FileDetailsForm from './FileDetailsForm';
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

describe('File Details Form', (): void => {
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

            const { container, debug } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);

            const dropzone = container.querySelector('.file-upload__dropzone');
            const file = new File([JSON.stringify({ ping: true })], 'ping.json', { type: 'application/json' });

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
                    fireEvent(dropzone, event);
                },
            );
            expect(container.querySelector('.file-upload__dropzone--uploading')).toBeInTheDocument();
            mutationResolve({
                data: {
                    data: {
                        uploadManuscript: {
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
    });
});
