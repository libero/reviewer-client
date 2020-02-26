import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FileUpload } from '../../molecules';

storiesOf('ui | molecules/FileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'FileUpload',
        (): JSX.Element => {
            const uploadInProgress = boolean('Upload in progress?', false);
            const fileName = text('File Name', 'SomeFile.pdf');
            const progress = number('Upload progress', 0, { range: true, min: 0, max: 100 });
            const error = select(
                'Error State',
                {
                    'No Error': null,
                    'Multiple files': 'multiple',
                    'File size': 'size',
                    'Server error': 'server',
                },
                null,
            );
            return (
                <div style={{ maxWidth: '700px', width: '100vw', padding: '20px' }}>
                    <FileUpload
                        state={{
                            uploadInProgress: uploadInProgress
                                ? {
                                      progress,
                                      fileName,
                                  }
                                : null,
                            error,
                        }}
                        onUpload={action('File Uploaded')}
                    />
                </div>
            );
        },
    );
