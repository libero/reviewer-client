import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';
import { ContentToggle, SelectField } from '../../atoms';

storiesOf('ui | molecules/Toggle', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ToggleComponent',
        (): JSX.Element => {
            const collapsedText = '+ Add a second country of residence/affiliation';
            const openText = '- Remove a second country of residence/affiliation';
            const title = 'Your country of residence or professional affiliation';
            const labelText = 'Secondary country of residence/affiliation';
            const options = [
                { label: 'Argentina', value: 'argentina' },
                { label: 'Canada', value: 'canada' },
                { label: 'Denmark', value: 'denmark' },
                { label: 'France', value: 'france' },
                { label: 'Hungary', value: 'hungary' },
                { label: 'Peru', value: 'peru' },
            ];
            return (
                <div className="toggle-component">
                    <h3 className="typography__heading typography__heading--h3">{title}</h3>
                    <SelectField id="selectField" labelText="" values={options}></SelectField>
                    <ContentToggle id="ContentToggle" collapsedText={collapsedText} openText={openText}>
                        <SelectField id="SelectFieldTwo" labelText={labelText} values={options}></SelectField>
                    </ContentToggle>
                </div>
            );
        },
    );
