import React, { LegacyRef, useState, useEffect, ChangeEventHandler } from 'react';
import { TextField } from '../atoms';
import { useTranslation } from 'react-i18next';

interface NameEmail {
    id?: string;
    name?: string;
    email?: string;
}

interface ValidationError {
    message?: string;
}

interface Props {
    maxRows: number;
    minRows?: number;
    register: (() => void) | LegacyRef<HTMLInputElement>;
    name: string;
    labelPrefix?: string;
    inputRows: NameEmail[];
    errors?: { email?: ValidationError; name?: ValidationError }[];
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    append?: (value: Partial<Record<string, any>> | Partial<Record<string, any>>[]) => void;
    remove?: (index?: number | number[]) => void;
}

const ExpandingEmailField = ({
    maxRows,
    minRows = 1,
    register,
    name,
    inputRows,
    labelPrefix,
    errors = [],
    onChange,
    className,
    append,
    remove,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const isRowBlank = (index: number): boolean => {
        return (
            (document.querySelector(`[name="${name}[${index}].name"]`) as HTMLInputElement).value +
                (document.querySelector(`[name="${name}[${index}].email"]`) as HTMLInputElement).value ===
            ''
        );
    };
    useEffect(() => {
        if (inputRows.length === 0) {
            append({ name: '', email: '' });
        }
        const lastField = inputRows[inputRows.length - 1];
        const secondLastField = inputRows[inputRows.length - 2];

        if (lastField) {
            if (!!secondLastField && isRowBlank(inputRows.length - 1) && isRowBlank(inputRows.length - 2)) {
                remove(inputRows.length - 1);
            }

            if ((lastField.name || lastField.email) && inputRows.length < maxRows) {
                if (secondLastField && (secondLastField.name || secondLastField.email)) {
                    append({ name: '', email: '' });
                } else if (!secondLastField) {
                    append({ name: '', email: '' });
                }
            }
        }
    }, [inputRows]);
    return (
        <div className={`${className ? className : ''} expanding-email-field`}>
            {inputRows.map((_, index) => (
                <div className="expanding-email-field__row" key={`row-${index}`}>
                    <TextField
                        className="expanding-email-field__pair--name"
                        id={`${name}-${index}-name`}
                        name={`${name}[${index}].name`}
                        register={register}
                        labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.name')}`}
                        invalid={!!(errors[index] && errors[index].name)}
                        helperText={errors[index] && errors[index].name ? errors[index].name.message : null}
                        onChange={onChange}
                    />
                    <TextField
                        className="expanding-email-field__pair--email"
                        id={`${name}-${index}-email`}
                        name={`${name}[${index}].email`}
                        register={register}
                        labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.email')}`}
                        invalid={!!(errors[index] && errors[index].email)}
                        helperText={errors[index] && errors[index].email ? errors[index].email.message : null}
                        onChange={onChange}
                    />
                </div>
            ))}
        </div>
    );
};

export default ExpandingEmailField;
