import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { UploadProgress } from '../../molecules';

storiesOf('ui | molecules/UploadProgress', module)
    .addDecorator(withKnobs)
    .add(
        'UploadProgress',
        (): JSX.Element => {
            const progress = number('progress', 60);
            const status = select('Status', ['IDLE', 'COMPLETE', 'ERROR'], 'IDLE');
            return <UploadProgress progress={progress} status={status} />;
        },
    );
