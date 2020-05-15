import React, { LegacyRef } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { EditorsDetails, ReviewerAlias } from '../../initial-submission/types';
import { TextField } from '../atoms';
import { useTranslation } from 'react-i18next';

interface Props {
    maxFields: number;
    control: Control<EditorsDetails>;
    register: () => LegacyRef<HTMLInputElement>;
    name: string;
}

const ExpandingEmailField = ({ maxFields, control, register, name }: Props): JSX.Element => {
    const { fields, append } = useFieldArray<ReviewerAlias>({
        control,
        name: 'suggestedReviewers',
    });
    const { t } = useTranslation('ui');

    if (fields.length === 0) {
        append({ name: '', email: '' });
    }

    return (
        <div className="expanding-email-field">
            {fields.map((field, index) => {
                return (
                    <React.Fragment key={`name[${index}]`}>
                        <TextField
                            className="expanding-email-field__pair--name"
                            id={`${name}-${index}-name`}
                            name={`${name}[${index}].name`}
                            register={register()}
                            labelText={t('expanding-email-field.name')}
                        />
                        <TextField
                            className="expanding-email-field__pair--email"
                            id={`${name}-${index}-email`}
                            name={`${name}[${index}].email`}
                            register={register()}
                            labelText={t('expanding-email-field.email')}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ExpandingEmailField;
