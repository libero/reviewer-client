import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs, object, number } from '@storybook/addon-knobs';
import { ExpandingEmailField } from '../../molecules';
import '../../../core/styles/index.scss';
import centered from '@storybook/addon-centered/react';
import { ReviewerAlias } from '../../../initial-submission/types';
import { action } from '@storybook/addon-actions';

storiesOf('ui | molecules/ExpandingEmailField', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ExpandingEmailField',
        (): JSX.Element => {
            const name = text('Field Name', 'Supper happy fun field');
            const labelPrefix = text('Label Prefix', 'HappyPerson');
            const inputRows = object<ReviewerAlias[]>('Fields', [{ name: 'bob', email: 'bob@email.com' }]);
            const errors = object<{ email?: { message: string }; name?: { message: string } }[]>('Errors', [
                { email: { message: 'ARG' } },
            ]);
            const maxRows = number('Maximum Rows', 6);
            const minRows = number('Minimum Rows', 1);
            const onChange = action('Change');
            return (
                <ExpandingEmailField
                    name={name}
                    maxRows={maxRows}
                    initialRows={inputRows}
                    labelPrefix={labelPrefix}
                    minRows={minRows}
                    errors={errors}
                    onChange={onChange}
                />
            );
        },
    );
