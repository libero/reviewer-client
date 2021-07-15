import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register?: () => void;
    options: { value: string; label: string }[];
    name: string;
    initialValue?: string;
}

const RadioButton = ({ register, options, name, initialValue }: Props): JSX.Element => (
    <div className="radio-button__group">
        <ul>
            {options.map((item, index) => (
                <React.Fragment key={item.value}>
                    <li className="radio-button__item">
                        <input
                            id={`${name}-option-${index}`}
                            ref={register}
                            type="radio"
                            className="radio-button__input"
                            name={name}
                            value={item.value}
                            defaultChecked={item.value == initialValue}
                        />
                        <div className="radio-button__button">
                            <div className="radio-button__button-inner"></div>
                        </div>
                        <label htmlFor={`${name}-option-${index}`} className="radio-button__label">
                            {item.label}
                        </label>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    </div>
);
export default RadioButton;
