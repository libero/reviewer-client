import { render, fireEvent, waitForElement, wait, act } from '@testing-library/react';
import React, { useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';

import routerWrapper from '../../../test-utils/routerWrapper';

const mutationMock = jest.fn();
let subscriptionData: {};

// jest.useFakeTimers();

const blah = async () => new Promise(resolve => {
    console.log('i am waiting');
    // resolve();
    setTimeout(() => {
        console.log('i am waiting - resolved');
        resolve()
    }, 1000);
});


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
        jest.spyOn(React, 'useState');
        // jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)

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
        // React.useEffect.mockRestore();
    });

    it('synchronously sends upload requests when multiple files are selected', async (): Promise<void> => {
        const mutationResolve = mutationMock
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        console.log('calling 1');
                        // resolve();
                        setTimeout(() => {
                            console.log('calling 1 resolved');
                            resolve()
                        }, 50);
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        console.log('calling 2');
                        // resolve();
                        setTimeout(() => {
                            console.log('calling 2 resolved');
                            resolve()
                        }, 100);
                    })
            )
            .mockImplementationOnce(
                () =>
                    new Promise(resolve => {
                        console.log('calling 3');
                        // resolve();
                        setTimeout(() => {
                            console.log('calling 3 resolved');
                            resolve()
                        }, 1000);
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
        await act(async () => await fireEvent.change(fileInput));
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(3);

        await act(async () => mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile1.png' }],
                    },
                },
            },
        }
        ));
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(2);


        await act(async () => await mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile1.png' }],
                    },
                },
            },
        }));

        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1);
    });
});


// const waitForUploads = async (container: HTMLElement, uploads: number): Promise<void> => {
//     await waitForElement(
//         () => {
//             return container.querySelectorAll('.multifile-upload__file-name--complete').length === uploads;
//         },
//         {
//             timeout: 110,
//         },
//     ).catch(error => {
//         console.log(error, uploads, 'argh');
//     });
// };