import React, { useState, useEffect } from 'react';
import { TextField } from '../atoms';
import { useTranslation } from 'react-i18next';

interface NameEmail {
    name?: string;
    email?: string;
}

interface ValidationError {
    message?: string;
}

interface Props {
    maxRows: number;
    minRows?: number;
    name: string;
    labelPrefix?: string;
    initialRows: NameEmail[];
    errors?: { email?: ValidationError; name?: ValidationError }[];
    onChange: (personArray: NameEmail[]) => void;
    className?: string;
}

const ExpandingEmailField = ({
    maxRows,
    minRows = 1,
    name,
    initialRows,
    labelPrefix,
    errors = [],
    onChange,
    className,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const [peopleArray, setPeopleArray] = useState<NameEmail[]>(initialRows);

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

    function addEmptyRow(): void {
        const newPeopleArray = [...peopleArray];
        newPeopleArray.push({ name: '', email: '' });
        setPeopleArray(newPeopleArray);
        onChange(newPeopleArray);
    }

    useEffect(() => {
        const lastField = peopleArray[peopleArray.length - 1];
        const secondLastField = peopleArray[peopleArray.length - 2];

        const blankRows = getTrailingBlankReviewerCount(peopleArray);
        if (peopleArray.length === 0) {
            addEmptyRow();
            return;
        }

        if (blankRows > 1) {
            const rowsToRemove = blankRows - 1;
            if (peopleArray.length - rowsToRemove >= minRows) {
                const newPeopleArray = [...peopleArray];
                newPeopleArray.splice(peopleArray.length - rowsToRemove - 1);
                setPeopleArray(newPeopleArray);
                onChange(newPeopleArray);
            }
        } else if (lastField && (lastField.name || lastField.email) && peopleArray.length < maxRows) {
            if (secondLastField && (secondLastField.name || secondLastField.email)) {
                addEmptyRow();
            } else if (!secondLastField) {
                addEmptyRow();
            }
        }
    }, [peopleArray]);

    const updatePeople = (index: number, field: 'name' | 'email', value: string): void => {
        const newPeople = [...peopleArray];
        newPeople[index][field] = value;
        onChange(newPeople);
        setPeopleArray(newPeople);
    };

    return (
        <div className={`${className ? className : ''} expanding-email-field`}>
            {peopleArray.map((person, index) => (
                <div className="expanding-email-field__row" key={`row-${index}`}>
                    <TextField
                        className="expanding-email-field__pair--name"
                        id={`${name}-${index}-name`}
                        name={`${name}[${index}].name`}
                        labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.name')}`}
                        invalid={!!(errors[index] && errors[index].name)}
                        helperText={errors[index] && errors[index].name ? errors[index].name.message : null}
                        onChange={(e): void => {
                            updatePeople(index, 'name', e.target.value);
                        }}
                        defaultValue={person.name}
                    />
                    <TextField
                        className="expanding-email-field__pair--email"
                        id={`${name}-${index}-email`}
                        name={`${name}[${index}].email`}
                        labelText={`${labelPrefix} ${index + 1} ${t('expanding-email-field.email')}`}
                        invalid={!!(errors[index] && errors[index].email)}
                        helperText={errors[index] && errors[index].email ? errors[index].email.message : null}
                        defaultValue={person.email}
                        onChange={(e): void => {
                            updatePeople(index, 'email', e.target.value);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ExpandingEmailField;
