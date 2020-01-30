import React from 'react';
import { storiesOf } from '@storybook/react';
import NoSubmissions from '../components/NoSubmissions';
import '../../core/styles/index.scss';

storiesOf('Dashboard | Components/NoSubmission', module).add(
    'NoSubmissions',
    (): JSX.Element => {
        return <NoSubmissions startSubmission={(): void => {}} />;
    },
);
