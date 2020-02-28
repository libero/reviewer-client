import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import FileDetailsForm from '../components/FileDetailsForm';
import '../../core/styles/index.scss';

storiesOf('Initial Submission | steps/FileDetails', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'FileDetails',
        (): JSX.Element => {
            const type = select('Type', ['primary', 'danger'], 'primary');
            const buttonText = text('Text', 'Button');
            const loading = boolean('Loading', false);
            return <FileDetailsForm />;
        },
    );
