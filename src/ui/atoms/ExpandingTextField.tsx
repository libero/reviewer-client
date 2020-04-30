import React, { InputHTMLAttributes, MutableRefObject, useState, useRef, useEffect } from 'react';
import Close from '@material-ui/icons/Close';

let numChars: number;

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    labelText?: string;
    register?: (element: HTMLTextAreaElement) => void;
    className?: string;
}

const ExpandingTextField = ({
    id,
    labelText,
    invalid,
    helperText,
    register,
    className,
    ...rest
}: Props): JSX.Element => {
    const minRows = 1;
    const maxRows = 4;

    const inputRef = useRef<HTMLTextAreaElement>();
    if (register) {
        register(inputRef.current);
    }

    const [rows, setRows] = useState<number>();
    const [flag, setFlag] = useState<boolean>();

    const setRowsOfTextArea = (newRows = 1): void => {
        if (newRows !== rows) {
            // Only trigger an update when it's changed
            setRows(newRows);
        }
    };

    const calculateHeight = (): void => {
        const { lineHeight } = window.getComputedStyle(inputRef.current);
        const intLineHeight = parseInt(lineHeight, 10);
        const { scrollHeight } = inputRef.current;
        const rows = Math.floor((scrollHeight - 24) / intLineHeight);

        const constrainedRows = Math.min(rows, maxRows || rows);
        const currentChars = inputRef.current.value.length;
        if (numChars > currentChars) {
            setRowsOfTextArea(minRows || 1);
            setFlag(true);
        } else {
            setRowsOfTextArea(constrainedRows);
        }
        numChars = currentChars;
    };

    useEffect(() => {
        if (flag) {
            setFlag(false);
            calculateHeight();
        }
    }, [flag]);

    useEffect(() => {
        calculateHeight();
    }, []);

    return (
        <div className={`expanding-text-field${className ? ' ' + className : ''}`}>
            {labelText && (
                <label htmlFor={id} className="typography__label typography__label--primary">
                    {labelText}
                </label>
            )}
            <textarea
                id={id}
                name={id}
                className={`text-field__input expanding-text-field__input ${
                    invalid ? 'text-field__input--invalid' : ''
                }`}
                type="text"
                rows={rows || minRows}
                ref={inputRef}
                onChange={calculateHeight}
                {...rest}
            />
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
