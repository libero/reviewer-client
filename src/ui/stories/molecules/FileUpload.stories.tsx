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
            const errorState = select(
                'Error State',
                {
                    'No Error': null,
                    'Multiple files': 'MULTIPLE',
                    'File size': 'SIZE',
                    'Server error': 'SERVER_ERROR',
                },
                null,
            );
            return (
                <div style={{ maxWidth: '700px', width: '100vw', padding: '20px' }}>
                    <FileUpload
                        state={{
                            error: errorState,
                        }}
                        onUpload={action('File Uploaded')}
                    />
                </div>
            );
        },
    );
