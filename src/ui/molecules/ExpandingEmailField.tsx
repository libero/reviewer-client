import React, { LegacyRef, useEffect } from 'react';
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
    append: (value: NameEmail) => void;
    remove: (index?: number) => void;
    watchArray: NameEmail[];
}

const ExpandingEmailField = ({
    maxFields,
    register,
    name,
    fields,
    labelPrefix,
    append,
    remove,
    watchArray,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    useEffect(() => {
        const lastField = watchArray[fields.length - 1];
        console.log(`watchArray: ${JSON.stringify(watchArray)}`);
        // console.log(`lastField: ${lastField}`);
        const secondLastField = watchArray[watchArray.length - 2];

        // if (
        //     fields.length > 2 &&
        //     !lastField.name &&
        //     !lastField.email &&
        //     !secondLastField.name &&
        //     !secondLastField.email
        // ) {
        //     console.log('removing', lastField, secondLastField);
        //     remove(fields.length - 1);
        // } else
        if ((lastField.name || lastField.email) && watchArray.length < maxFields) {
            if (secondLastField && (secondLastField.name || secondLastField.email)) {
                console.log('append 1');
                append({ name: '', email: '' });
            } else if (!secondLastField) {
                append({ name: '', email: '' });
                console.log('append 2');
            } else {
                console.log('bugger');
            }
        }
    }, [watchArray]);

    useEffect(() => {
        console.log('fields: ', JSON.stringify(fields));
    }, [fields]);
    // console.log('render');
    // useEffect(() => {
    //     return (): void => {
    //         console.log('unmount');
    //     };
    // }, []);

    const removeCallback = (index: number, value: string) => {
        if (index === watchArray.length - 1 && !value) {
            remove(index);
        }
    };
    return (
        <div className="expanding-email-field">
            <button onClick={() => console.log(JSON.stringify(fields))} >print</button>
            {fields.map((field, index) => {
                return (
                    <div className="expanding-email-field__row" key={field.id}>
                        <button onClick={() => remove(index)} >Remove</button>
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
