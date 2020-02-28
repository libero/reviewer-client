import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { MultiFileUpload } from '../../molecules';

storiesOf('ui | molecules/MultiFileUpload', module)
    .addDecorator(withKnobs)
    .add(
        'MultiFileUpload',
        (): JSX.Element => {
            const files = object('Files', [
                { fileName: 'File 1.pdf' },
                { fileName: 'File 2.pdf' },
                { fileName: 'File 3.pdf' },
                { fileName: 'File 4.pdf' },
                { fileName: 'File 5.pdf' },
            ]);
            return <MultiFileUpload files={files} />;
        },
    );
