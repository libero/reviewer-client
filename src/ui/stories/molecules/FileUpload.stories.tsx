import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, number, boolean } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router';
import { action } from '@storybook/addon-actions';
import { FileUpload } from '../../molecules';

storiesOf('ui | molecules/FileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'FileUpload',
        (): JSX.Element => {
            const uploadInProgress = boolean('Upload in progress?', false);
            const fileStored = boolean('File already stored?', false);
            const fileName = text('File Name', 'SomeFile.pdf');
            const previewLink = text('File prview link', 'https://elifesciences.org/');
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
                <MemoryRouter initialEntries={['/']}>
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
                                fileStored: fileStored
                                    ? {
                                          fileName,
                                          previewLink,
                                      }
                                    : null,
                            }}
                            onUpload={action('File Uploaded')}
                        />
                    </div>
                </MemoryRouter>
            );
        },
    );
