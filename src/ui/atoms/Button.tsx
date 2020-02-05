import React from 'react';
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    type?: string;
    children?: string;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<Props> = ({
    type,
    children,
    className,
    disabled = false,
    loading = false,
    ...rest
}: Props): JSX.Element => (
    <button
        className={`button${type ? ' button--' + type : ''}${className ? ' ' + className : ''}`}
        disabled={disabled}
        {...rest}
    >
        <span className={`button__text ${loading ? ' button--loading' : ''}`}>{children}</span>
    </button>
);

export default Button;
