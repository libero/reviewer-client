import React, { InputHTMLAttributes, useState, ChangeEvent } from 'react';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    initialValue?: boolean;
    labelText: string;
    register?: () => void;
}

const Checkbox = ({
    id,
    labelText,
    invalid,
    helperText,
    initialValue,
    onChange = (): void => {},
    register,
    ...rest
}: Props): JSX.Element => {
    const [checked, setChecked] = useState(initialValue);
    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>): void => {
        setChecked(event.target.checked);
        onChange(event);
    };
    return (
        <div className="checkbox-field">
            <input
                id={id}
                name={id}
                className="checkbox-field__input"
                type="checkbox"
                onChange={onChangeCallback}
                defaultChecked={initialValue}
                ref={register}
                {...rest}
            />
            <label
                htmlFor={id}
                className={`checkbox-field__label${checked ? ' checkbox-field__label--checked' : ''}${
                    invalid ? ' checkbox-field__label--invalid' : ''
                }`}
            >
                {checked && <Check aria-hidden="true" className="checkbox-field__label-check" viewBox="0 0 30 30" />}
                {labelText}
            </label>
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
};

export default Checkbox;
