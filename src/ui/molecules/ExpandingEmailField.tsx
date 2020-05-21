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
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const [rowCount, setRowCount] = useState<number>(inputRows.length);

    const isRowBlank = (row: NameEmail): boolean => row.name + row.email === '';

    const getTrailingBlankReviewerCount = (rows: NameEmail[]): number => {
        let blankRows = 0;
        for (let index = rows.length - 1; index >= 0; index -= 1) {
            const item = rows[index];
            if (isRowBlank(item)) {
                blankRows += 1;
            } else {
                break;
            }
        }
        return blankRows;
    };
    useEffect(() => {
        const lastField = inputRows[inputRows.length - 1];
        const secondLastField = inputRows[inputRows.length - 2];

        const blankRows = getTrailingBlankReviewerCount(inputRows);
        if (blankRows > 1) {
            const rowsToRemove = blankRows - 1;
            if (rowCount - rowsToRemove >= minRows) {
                setRowCount(rowCount - rowsToRemove);
            }
        } else if ((lastField.name || lastField.email) && inputRows.length < maxRows) {
            if (secondLastField && (secondLastField.name || secondLastField.email)) {
                setRowCount(rowCount + 1);
            } else if (!secondLastField) {
                setRowCount(rowCount + 1);
            }
        }
    }, [inputRows]);
    return (
        <div className={`${className ? className : ''} expanding-email-field`}>
            {[...Array(rowCount)].map((_, index) => (
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
