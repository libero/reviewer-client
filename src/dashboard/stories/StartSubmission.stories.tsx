import React from 'react';
import { storiesOf } from '@storybook/react';
import '../../core/styles/index.scss';
import StartSubmission from '../components/StartSubmission';

storiesOf('Dashboard | Components/StartSubmission', module).add(
    'StartSubmission',
    (): JSX.Element => {
        return (
            <div id="app">
                <StartSubmission buttonText="Start Submission" />
            </div>
        );
    },
);
