import { render, fireEvent, act, waitFor } from '@testing-library/react';
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

describe('SupportingFiles upload - Needs to be done in its own describe', () => {
    beforeEach(() => {
        mutationMock.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolve({
                        data: {
                            uploadSupportingFile: {
                                files: {
                                    supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'testfile.pdf' }],
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

    it('synchronously sends upload requests when multiple files are selected', async (): Promise<void> => {
        const mutationResolve = mutationMock
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => resolve(), 0)
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => resolve(), 10)
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => resolve(), 100)
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => resolve(), 0)
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        setTimeout(() => resolve(), 300)
                    })
            );
        const { container } = render(
            <FileDetailsForm initialValues={{ id: 'test', updated: Date.now(), articleType: '' }} />,
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

        fireEvent.change(fileInput);

        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(3);

        mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file1.pdf', filename: 'supercoolfile1.png' }],
                    },
                },
            },
        });

        await waitFor(() => expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1));
        await waitFor(() => expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(2));

        mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file2.pdf', filename: 'supercoolfile2.png' }],
                    },
                },
            },
        });

        await waitFor(() => expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2));
        await waitFor(() => expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1));

        // await act(async() => await mutationResolve({
        //     data: {
        //         uploadSupportingFile: {
        //             files: {
        //                 supportingFiles: [{ url: 'http://localhost/file3.pdf', filename: 'supercoolfile3.png' }],
        //             },
        //         },
        //     },
        // }));

        // expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2);
        // expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1);
    });
});