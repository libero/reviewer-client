import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, boolean } from '@storybook/addon-knobs';
import { UploadProgress } from '../../molecules';

storiesOf('ui | molecules/UploadProgress', module)
    .addDecorator(withKnobs)
    .add(
        'UploadProgress',
        (): JSX.Element => {
            const progress = number('progress', 60);
            const status = select('Status', ['IDLE', 'UPLOADING', 'PROCESSING', 'COMPLETE', 'ERROR'], 'IDLE');
            const small = boolean('Small', false);
            return <UploadProgress progress={progress} status={status} small={small} />;
        },
    );
