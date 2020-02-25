import React, { TextareaHTMLAttributes } from 'react';
import { Close } from '@material-ui/icons';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    register?: () => void;
    className?: string;
}

const CoverLetter = ({ id, className, value, invalid, register, helperText, ...rest }: Props): JSX.Element => {
    return (
        <div className={`cover-letter${className ? ' ' + className : ''}`}>
            <textarea className="cover-letter__input" id={id} name={id} ref={register} {...rest}></textarea>
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

export default CoverLetter;
