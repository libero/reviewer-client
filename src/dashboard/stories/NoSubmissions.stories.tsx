import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoSubmissions from '../components/NoSubmissions';
import '../../core/styles/index.scss';

storiesOf('Dashboard | Components/NoSubmission', module).add(
    'NoSubmissions',
    (): JSX.Element => {
        return <NoSubmissions onStartClick={action('Start submission clicked')} />;
    },
);
