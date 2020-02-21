import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { UploadProgress } from '../../molecules';

storiesOf('ui | molecules/UploadProgress', module)
    .addDecorator(withKnobs)
    .add(
        'UploadProgress',
        (): JSX.Element => {
            const progress = number('progress', 60);
            return <UploadProgress progress={progress} />;
        },
    );
