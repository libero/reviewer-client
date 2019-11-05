import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

storiesOf('ui | molecules/NameEmail', module)
    .addDecorator(centered)
    .add(
        'NameEmail',
        (): JSX.Element => {
            return <div>Name and Email component</div>;
        },
    );
