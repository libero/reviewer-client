import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { RadioButton } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/RadioButton', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'RadioButton',
        (): JSX.Element => {
            const options = [
                { value: 'chickenwings', label: 'Chicken Wings' },
                { value: 'cheeseburger', label: 'Cheeseburger' },
                { value: 'hotdog', label: 'Hot Dog' },
            ];
            return <RadioButton name="myRadioButton" options={options} />;
        },
    );
