import React, { LegacyRef } from 'react';
import { TextField } from '../atoms';
import { useTranslation } from 'react-i18next';

interface NameEmail {
    id?: string;
    name?: string;
    email?: string;
}

interface Props {
    maxFields: number;
    register: () => LegacyRef<HTMLInputElement>;
    name: string;
    fields: NameEmail[];
    labelPrefix?: string;
}

const ExpandingEmailField = ({ maxFields, register, name, fields, labelPrefix }: Props): JSX.Element => {
    const { t } = useTranslation('ui');

    return (
        <div className="expanding-email-field">
            {fields.map((field, index) => {
                return (
                    <div className="expanding-email-field__row" key={field.id}>
                        <TextField
                            className="expanding-email-field__pair--name"
                            id={`${name}-${index}-name`}
                            name={`${name}[${index}].name`}
                            register={register()}
                            labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.name')}`}
                        />
                        <TextField
                            className="expanding-email-field__pair--email"
                            id={`${name}-${index}-email`}
                            name={`${name}[${index}].email`}
                            register={register()}
                            labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.email')}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ExpandingEmailField;
