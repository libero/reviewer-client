import React, { InputHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    labelText?: string;
    icon?: JSX.Element;
    register?: () => void;
    className?: string;
}

const ExpandingTextField = ({
    id,
    labelText,
    invalid,
    helperText,
    icon,
    register,
    className,
    ...rest
}: Props): JSX.Element => {
    return (
        <div className={`text-field${className ? ' ' + className : ''}`}>
            {labelText && (
                <label htmlFor={id} className="typography__label typography__label--primary">
                    {labelText}
                </label>
            )}
            <div className="text-field__input_container">
                <input
                    id={id}
                    name={id}
                    className={`text-field__input ${invalid ? 'text-field__input--invalid' : ''}`}
                    type="text"
                    ref={register}
                    {...rest}
                />
                <div className="text-field__icon_container">{icon}</div>
            </div>
            <span
                className={`typography__label typography__label--helper-text ${
                    invalid ? 'typography__label--error' : 'typography__label--secondary'
                }`}
            >
                {invalid && <Close fontSize="small" />}
                {helperText}
            </span>
        </div>
    );
};

export default ExpandingTextField;
