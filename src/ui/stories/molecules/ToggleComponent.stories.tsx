import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';
import { SelectField } from '../../atoms';

storiesOf('ui | molecules/Toggle', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ToggleComponent',
        (): JSX.Element => {
            return (
                <div className="toggle">
                    <span className="burger">Test</span>
                    <SelectField id="" values={[]} labelText=""></SelectField>
                </div>
            );
        },
    );
