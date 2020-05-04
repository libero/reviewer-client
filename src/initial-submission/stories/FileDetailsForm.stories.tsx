import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import FileDetailsForm from '../components/FileDetailsForm';
import '../../core/styles/index.scss';

storiesOf('Initial Submission | steps/FileDetails', module)
    .addDecorator(centered)
    .add(
        'FileDetails',
        (): JSX.Element => {
            return (
                <FileDetailsForm
                    initialValues={{
                        id: '42',
                        updated: Date.now(),
                        articleType: 'fiction',
                    }}
                />
            );
        },
    );
