import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { MultiFileUpload } from '../../molecules';
import { FileState } from '../../molecules/MultiFileUpload';

storiesOf('ui | molecules/MultiFileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'MultiFileUpload',
        (): JSX.Element => {
            const onUpload = (files: FileList): void => {
                action('uploaded ' + files[0].name)();
            };

            const onDelete = (id: string): void => {
                action(`deleted ${id}`)();
            };

            const disableUpload = boolean('Disable upload link', false);
            const files = object('Files', [
                { fileStored: { fileName: 'File 1.pdf', id: '1234' } },
                { uploadInProgress: { fileName: 'File 2.pdf', progress: 42 } },
                { uploadInProgress: { fileName: 'File 3.pdf' }, error: 'multiple' },
                { uploadInProgress: { fileName: 'File 4.pdf', progress: 0 } },
            ] as FileState[]);
            return (
                <MultiFileUpload disableUpload={disableUpload} files={files} onUpload={onUpload} onDelete={onDelete} />
            );
        },
    );
