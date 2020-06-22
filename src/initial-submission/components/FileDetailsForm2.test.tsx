import '../../../test-utils/i18n-mock';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import React, { useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';
import routerWrapper from '../../../test-utils/routerWrapper';
import * as yup from 'yup';

const mutationMock = jest.fn(() => new Promise(() => {}));
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

const waitForUploads = async (container: HTMLElement, uploads: number, state: string): Promise<void> => {
    await waitFor<boolean>(
        () => container.querySelectorAll(`.multifile-upload__file-name--${state}`).length == uploads,
        {
            container,
            timeout: 2000,
        },
    ).catch(error => {
        console.log(error, uploads, `The wait for ${uploads} uploading files has failed!`);
    });
};

describe('SupportingFiles upload', () => {
    it('Can upload one file', async (): Promise<void> => {
        let mutationResolve1: (value?: unknown) => void;

        mutationMock.mockImplementationOnce(
            () =>
                new Promise(resolve => {
                    mutationResolve1 = resolve;
                }),
        );

        const { container } = render(
            <FileDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={{ id: 'test', updated: new Date().toISOString(), articleType: '' }}
            />,
            {
                wrapper: routerWrapper(),
            },
        );
        const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        Object.defineProperty(fileInput, 'files', {
            value: [file1],
        });
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);

        await fireEvent.change(fileInput);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-status--processing')).toHaveLength(1);

        mutationResolve1({
            data: {
                uploadSupportingFile: {
                    url: 'bucket/path/file.pdf',
                    filename: 'supercoolfile1.png',
                    downloadLink: 'http://localhost/file.pdf',
                },
            },
        });
        await waitForUploads(container, 1, 'complete');
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    });
    it('Can upload two files', async (): Promise<void> => {
        mutationMock
            .mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        uploadSupportingFile: {
                            url: 'bucket/path/file.pdf',
                            filename: 'supercoolfile1.png',
                            id: 'file1',
                            downloadLink: 'http://localhost/file.pdf',
                        },
                    },
                }),
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        uploadSupportingFile: {
                            url: 'bucket/path/file.pdf',
                            filename: 'supercoolfile2.png',
                            id: 'file2',
                            downloadLink: 'http://localhost/file.pdf',
                        },
                    },
                }),
            );

        const { container } = render(
            <FileDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={{ id: 'test', updated: new Date().toISOString(), articleType: '' }}
            />,
            {
                wrapper: routerWrapper(),
            },
        );
        const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
        const file2 = new File(['§§§'], 'supercoolfile2.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        Object.defineProperty(fileInput, 'files', {
            value: [file1, file2],
        });
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);

        await act(async () => await fireEvent.change(fileInput));

        await waitForUploads(container, 2, 'complete');
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    });
    it('Can upload three files', async (): Promise<void> => {
        mutationMock
            .mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        uploadSupportingFile: {
                            url: 'bucket/path/file.pdf',
                            filename: 'supercoolfile1.png',
                            id: 'file1',
                            downloadLink: 'http://localhost/file.pdf',
                        },
                    },
                }),
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        uploadSupportingFile: {
                            url: 'bucket/path/file.pdf',
                            filename: 'supercoolfile2.png',
                            id: 'file2',
                            downloadLink: 'http://localhost/file.pdf',
                        },
                    },
                }),
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        uploadSupportingFile: {
                            url: 'bucket/path/file.pdf',
                            filename: 'supercoolfile3.png',
                            id: 'file3',
                            downloadLink: 'http://localhost/file.pdf',
                        },
                    },
                }),
            );

        const { container } = render(
            <FileDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={{ id: 'test', updated: new Date().toISOString(), articleType: '' }}
            />,
            {
                wrapper: routerWrapper(),
            },
        );
        const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
        const file2 = new File(['§§§'], 'supercoolfile2.png', { type: 'image/png' });
        const file3 = new File(['§§§'], 'supercoolfile3.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        Object.defineProperty(fileInput, 'files', {
            value: [file1, file2, file3],
        });
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);

        await act(async () => await fireEvent.change(fileInput));

        await waitForUploads(container, 3, 'complete');
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(3);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    });

    it('puts file item into an error state if the request is rejected', async (): Promise<void> => {
        mutationMock.mockImplementation(() => Promise.reject());

        const { container, getByText } = render(
            <FileDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={{ id: 'test', updated: new Date().toISOString(), articleType: '' }}
            />,
            {
                wrapper: routerWrapper(),
            },
        );
        const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        Object.defineProperty(fileInput, 'files', {
            value: [file1],
        });
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-name--error')).toHaveLength(0);

        await fireEvent.change(fileInput);
        await waitForUploads(container, 1, 'error');
        expect(container.querySelectorAll('.multifile-upload__file-name--error')).toHaveLength(1);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
        expect(getByText('multifile-upload.status-error.server')).toBeInTheDocument();
    });

    it('deletes an error state supporting upload item', async (): Promise<void> => {
        mutationMock.mockImplementation(() => Promise.reject());

        const { container, getByText } = render(
            <FileDetailsForm
                schemaFactory={(): yup.ObjectSchema => yup.object()}
                initialValues={{ id: 'test', updated: new Date().toISOString(), articleType: '' }}
            />,
            {
                wrapper: routerWrapper(),
            },
        );
        const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
        const fileInput = container.querySelector('.multifile-upload__input');
        Object.defineProperty(fileInput, 'files', {
            value: [file1],
        });
        await fireEvent.change(fileInput);
        await waitForUploads(container, 1, 'error');
        expect(container.querySelectorAll('.multifile-upload__file-name--error')).toHaveLength(1);
        expect(getByText('supercoolfile1.png')).toBeInTheDocument();
        fireEvent.click(container.querySelector('.multifile-upload__delete'));
        expect(() => getByText('supercoolfile1.png')).toThrow();
    });
});
