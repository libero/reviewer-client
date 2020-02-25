import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { FileUpload } from '../../molecules';

storiesOf('ui | molecules/FileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'FileUpload',
        (): JSX.Element => {
            return (
                <FileUpload
                    onUpload={files => {
                        console.log(files);
                    }}
                />
            );
        },
    );
