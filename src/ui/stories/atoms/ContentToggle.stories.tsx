import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';
import { ContentToggle } from '../../atoms';
import { SelectField } from '../../atoms';

storiesOf('ui | atoms/ContentToggle', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ContentToggle',
        (): JSX.Element => {
            const collapsedText = text('Text for collapsed link', 'Add secondary country of residence/affiliation');
            const openText = text('Text for open link', 'Remove secondary country of residence/affiliation');
            const values = [
                { label: 'Squirrel', value: 'squirrel' },
                { label: 'Cat', value: 'cat' },
                { label: 'Dog', value: 'dog' },
                { label: 'Ferret', value: 'ferret' },
                { label: 'Rabbit', value: 'bunny' },
                { label: 'Unicorn', value: 'unicorn' },
            ];
            return (
                <>
                    <SelectField id="test" labelText="This is label text" values={values}></SelectField>
                    <ContentToggle id="someid" collapsedText={collapsedText} openText={openText}>
                        <SelectField id="test" labelText="This is label text" values={values}></SelectField>
                    </ContentToggle>
                </>
            );
        },
    );
