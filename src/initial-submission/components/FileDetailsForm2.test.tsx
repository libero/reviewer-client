import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import React, { useEffect, useRef, DependencyList } from 'react';
import FileDetailsForm from './FileDetailsForm';
import nock from 'nock';

import routerWrapper from '../../../test-utils/routerWrapper';

nock('http://localhost:80')
    .get(uri => {
        console.log('problem uri', uri);
        return false;
    })
    .reply(200);

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
                        setTimeout(() => resolve(), 50);
                    }));

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
        await fireEvent.change(fileInput);
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(0);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(3);
        mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile1.png' }],
                    },
                },
            },
        });
        // await waitForUploads(container, 1);
        await wait(() =>{},{timeout: 100});
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(1);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(2);
        mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile2.png' }],
                    },
                },
            },
        });
        await wait();
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(2);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(1);
        mutationResolve({
            data: {
                uploadSupportingFile: {
                    files: {
                        supportingFiles: [{ url: 'http://localhost/file.pdf', filename: 'supercoolfile3.png' }],
                    },
                },
            },
        });
        await wait();
        expect(container.querySelectorAll('.multifile-upload__file-name--complete')).toHaveLength(3);
        expect(container.querySelectorAll('.multifile-upload__file-status--uploading')).toHaveLength(0);
    });
});
