import React from 'react';
import { storiesOf } from '@storybook/react';
import { CoverLetter } from '../../molecules';

storiesOf('ui | molecules/CoverLetter', module).add(
    'CoverLetter',
    (): JSX.Element => {
        return <CoverLetter id="someid" coverLetter="title" />;
    },
);
