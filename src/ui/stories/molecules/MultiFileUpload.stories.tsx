import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { MultiFileUpload } from '../../molecules';

type UploadErrors = 'multiple' | 'size' | 'server';
type UploadInProgress = {
    progress?: number;
    fileName?: string;
};
type FileStored = {
    fileName?: string;
    previewLink?: string;
};

type File = {
    uploadInProgress?: UploadInProgress;
    error?: UploadErrors;
    fileStored?: FileStored;
};

storiesOf('ui | molecules/MultiFileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'MultiFileUpload',
        (): JSX.Element => {
            const files = object('Files', [
                { fileStored: { fileName: 'File 1.pdf' } },
                { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } },
                { uploadInProgress: { fileName: 'File 3.pdf' }, error: 'multiple' },
                { fileStored: { fileName: 'File 4.pdf' } },
            ] as File[]);
            return <MultiFileUpload files={files} />;
        },
    );
