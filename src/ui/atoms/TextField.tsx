import React, { InputHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    helperText?: string;
    id: string;
    invalid: boolean;
    labelText: string;
    placeholder?: string;
}
const TextField = ({ id, labelText, placeholder, invalid, helperText, ...rest }: Props): JSX.Element => (
    <div className="text-field">
        <label htmlFor={id} className="typography__label typography__label--primary">
            {labelText}
        </label>
        <input
            id={id}
            className={`text-field__input ${invalid ? 'text-field__input--invalid' : ''}`}
            type="text"
            placeholder={placeholder}
            {...rest}
        />
        <span
            className={`typography__label typography__label--helper-text ${
                invalid ? 'typography__label--error' : 'typography__label--secondary'
            }`}
        >
            {invalid && <Close fontSize="default" />}
            {helperText}
        </span>
    </div>
);

export default TextField;
