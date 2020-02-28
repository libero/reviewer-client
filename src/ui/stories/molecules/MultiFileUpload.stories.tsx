import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { MultiFileUpload } from '../../molecules';

storiesOf('ui | molecules/MultiFileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'MultiFileUpload',
        (): JSX.Element => {
            return <MultiFileUpload />;
        },
    );
