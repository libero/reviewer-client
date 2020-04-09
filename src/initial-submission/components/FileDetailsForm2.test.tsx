import '../../../test-utils/i18n-mock';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React, { useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';
import routerWrapper from '../../../test-utils/routerWrapper';

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

describe('SupportingFiles upload', () => {
    it('Can upload one file', async (): Promise<void> => {
        let mutationResolve1: (value?: unknown) => void;

        const waitForUploads = async (container: HTMLElement, uploads: number): Promise<void> => {
            await waitFor<boolean>(
                () => container.querySelectorAll('.multifile-upload__file-name--complete').length == uploads,
                {
                    container,
                    timeout: 2000,
                },
            ).catch(error => {
                console.log(error, uploads, `The wait for ${uploads} uploading files has failed!`);
            });
        };

        mutationMock.mockImplementationOnce(
            () =>
                new Promise(resolve => {
                    mutationResolve1 = resolve;
                }),
        );

        const { container } = render(
            <FileDetailsForm initialValues={{ id: 'test', updated: Date.now(), articleType: '' }} />,
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
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1);

        mutationResolve1({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile1.png' }],
                    },
                },
            },
        });
        await waitForUploads(container, 1);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    });
    // it('synchronously sends upload requests when multiple files are selected', async (): Promise<void> => {
    //     let mutationResolve1: (value?: unknown) => void;
    //     let mutationResolve2: (value?: unknown) => void;
    //     let mutationResolve3: (value?: unknown) => void;

    //     const waitForUploads = async (container: HTMLElement, uploads: number): Promise<void> => {
    //         const result = await waitFor<boolean>(
    //             () => container.querySelectorAll('.multifile-upload__file-name--complete').length == uploads,
    //             {
    //                 container,
    //                 timeout: 2000,
    //             },
    //         ).catch(error => {
    //             console.log(error, uploads, `The wait for ${uploads} uploading files has failed!`);
    //         });
    //         console.log(`SUCCESS uploads = ${uploads} | ${result}`);
    //     };

    //     mutationMock
    //         .mockImplementationOnce(() => {
    //             console.log('setting mutationResolve1');
    //             return new Promise(resolve => {
    //                 mutationResolve1 = resolve;
    //             }).then(() => {
    //                 console.log(`...resolved mutationResolve1 to X`);
    //             });
    //         })
    //         .mockImplementationOnce(
    //             () =>
    //                 new Promise(resolve => {
    //                     mutationResolve2 = resolve;
    //                 }),
    //         )
    //         .mockImplementationOnce(
    //             () =>
    //                 new Promise(resolve => {
    //                     mutationResolve3 = resolve;
    //                 }),
    //         );
    //     const { container, debug } = render(
    //         <FileDetailsForm initialValues={{ id: 'test', updated: Date.now(), articleType: '' }} />,
    //         {
    //             wrapper: routerWrapper(),
    //         },
    //     );
    //     const file1 = new File(['§§§'], 'supercoolfile1.png', { type: 'image/png' });
    //     const file2 = new File(['§§§'], 'supercoolfile2.png', { type: 'image/png' });
    //     const file3 = new File(['§§§'], 'supercoolfile3.png', { type: 'image/png' });
    //     const fileInput = container.querySelector('.multifile-upload__input');
    //     Object.defineProperty(fileInput, 'files', {
    //         value: [file1, file2, file3],
    //     });
    //     await fireEvent.change(fileInput);
    //     expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);
    //     expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(3);
    //     console.log('initialised as expected...');

    //     mutationResolve1({
    //         data: {
    //             uploadSupportingFile: {
    //                 files: {
    //                     supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile1.png' }],
    //                 },
    //             },
    //         },
    //     });
    //     console.log('waiting...');
    //     await waitForUploads(container, 1);
    //     debug();
    //     expect(document.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1);
    //     expect(document.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(2);
    //     mutationResolve2({
    //         data: {
    //             uploadSupportingFile: {
    //                 files: {
    //                     supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile2.png' }],
    //                 },
    //             },
    //         },
    //     });
    //     await waitForUploads(container, 2);
    //     expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2);
    //     expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1);
    //     mutationResolve3({
    //         data: {
    //             uploadSupportingFile: {
    //                 files: {
    //                     supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile3.png' }],
    //                 },
    //             },
    //         },
    //     });
    //     await waitForUploads(container, 3);
    //     expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(3);
    //     expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    // });
});
