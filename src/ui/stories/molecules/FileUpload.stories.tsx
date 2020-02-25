import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FileUpload } from '../../molecules';

storiesOf('ui | molecules/FileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'FileUpload',
        (): JSX.Element => {
            const progress = number('progress', 60);
            const status = select('Status', ['IDLE', 'UPLOADING', 'COMPLETE', 'ERROR'], 'IDLE');
            return (
                <div style={{ maxWidth: '700px', width: '100vw', padding: '20px' }}>
                    <FileUpload progress={progress} status={status} onUpload={action('File Uploaded')} />
                </div>
            );
        },
    );
