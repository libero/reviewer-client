import { StoreReaderConfig } from 'apollo-cache-inmemory';
import React, { ReactNode, MouseEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register?: () => void;
    options: { value: string; label: string }[];
    name: string;
}

const RadioButton = ({ register, options, name }: Props): JSX.Element => (
    <div className="radio-button__group">
        <ul>
            {options.map(item => (
                <React.Fragment key={item.value}>
                    <li className="radio-button__item">
                        <input
                            ref={register}
                            type="radio"
                            className="radio-button__input"
                            name={name}
                            value={item.value}
                        />
                        <div className="radio-button__button">
                            <div className="radio-button__button-inner"></div>
                        </div>
                        <label className="radio-button__label">{item.label}</label>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    </div>
);
export default RadioButton;
