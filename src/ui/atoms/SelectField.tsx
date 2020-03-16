import React from 'react';
import Close from '@material-ui/icons/Close';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Select, { components } from 'react-select';
import { IndicatorProps } from 'react-select/src/components/indicators';
import { ValueType } from 'react-select/src/types';
import { RHFInput } from 'react-hook-form-input';
import { ValidationOptions } from 'react-hook-form-input/dist/types';

export interface Value {
    label: string;
    value: string;
}

interface Props {
    helperText?: string;
    id: string;
    invalid?: boolean;
    labelText: string;
    values: Value[];
    multi?: boolean;
    searchable?: boolean;
    placeholder?: string;
    defaultValue?: Value;
    onChange?(value: ValueType<Value>): void;
    formComponent?: boolean;
    register?: (ref: unknown, rules: ValidationOptions) => (name: string) => void;
    setValue?: (name: string, value: unknown, trigger?: boolean) => void;
}
const DropdownIndicator = (props: IndicatorProps<Value>): JSX.Element => (
    <components.DropdownIndicator {...props}>
        <ArrowDropDown />
    </components.DropdownIndicator>
);
const SelectField = ({
    helperText,
    id,
    invalid = false,
    labelText,
    values,
    multi = false,
    placeholder,
    defaultValue,
    searchable,
    onChange,
    formComponent = false,
    register,
    setValue,
}: Props): JSX.Element => {
    const select = (
        <Select
            aria-labelledby={`${id}-label`}
            className={`select-field ${invalid ? 'select-field--error' : ''}`}
            classNamePrefix="select-field"
            options={values}
            components={{ DropdownIndicator }}
            placeholder={placeholder}
            onChange={onChange}
            isMulti={multi}
            defaultValue={defaultValue}
            isSearchable={searchable}
        />
    );
    return (
        <React.Fragment>
            <span id={`${id}-label`} className="typography__label typography__label--primary">
                {labelText}
            </span>
            {formComponent ? <RHFInput as={select} name={id} register={register} setValue={setValue} /> : select}
            <span
                className={`typography__label typography__label--helper-text ${
                    invalid ? 'typography__label--error' : 'typography__label--secondary'
                }`}
            >
                {invalid && <Close fontSize="small" />}
                {helperText}
            </span>
        </React.Fragment>
    );
};

export default SelectField;
