import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Select, { components } from 'react-select';
import { ValueType } from 'react-select/src/types';
import { Value } from '../../ui/atoms/SelectField';
import { IndicatorProps } from 'react-select/src/components/indicators';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

interface Props {
    links: Array<{ link: string; label: string }>;
    currentPath: string;
}

const DropdownClosedIndicator = (props: IndicatorProps<Value>): JSX.Element => (
    <components.DropdownIndicator {...props}>
        <ArrowDropDown />
    </components.DropdownIndicator>
);

const DropdownOpenedIndicator = (props: IndicatorProps<Value>): JSX.Element => (
    <components.DropdownIndicator {...props}>
        <ArrowDropUp />
    </components.DropdownIndicator>
);

interface MobileNavProps {
    id: string;
    values: Value[];
    multi?: boolean;
    searchable?: boolean;
    placeholder?: string;
    defaultValue?: Value;
    onChange?(value: ValueType<Value>): void;
    formComponent?: boolean;
}

const MobileNav = ({ id, values, defaultValue }: MobileNavProps): JSX.Element => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const onChange = (option: Value): void => {
        history.push(option.value);
    };
    return (
        <Select
            aria-labelledby={`${id}-label`}
            className={'mobile-dropdown'}
            classNamePrefix="select-nav"
            options={values}
            components={{ DropdownIndicator: isOpen ? DropdownOpenedIndicator : DropdownClosedIndicator }}
            onChange={onChange}
            isMulti={false}
            defaultValue={defaultValue}
            isSearchable={false}
            onFocus={(): void => setIsOpen(!isOpen)}
            onBlur={(): void => setIsOpen(!isOpen)}
        />
    );
};

const ContactUsNavigation = ({ links, currentPath = '/' }: Props): JSX.Element => {
    const isSelected = (path: string): boolean => {
        return path.toLocaleLowerCase().trim() === currentPath.toLocaleLowerCase().trim();
    };
    const dropdownLinks = links.map(l => ({ label: l.label, value: l.link }));
    return (
        <React.Fragment>
            <div className="dropdown-nav">
                <MobileNav
                    id="selectedNavigationItem"
                    values={dropdownLinks}
                    defaultValue={dropdownLinks.find(dl => isSelected(dl.value))}
                    searchable={false}
                />
            </div>
            <div className="side-bar-nav">
                {links.map(l => (
                    <span key={`${l.link}-container`}>
                        <Link
                            key={`${l.link}`}
                            to={l.link}
                            className={isSelected(l.link) ? 'typography__body--link active' : 'typography__body--link '}
                        >
                            {l.label}
                        </Link>
                    </span>
                ))}
            </div>
        </React.Fragment>
    );
};

export default ContactUsNavigation;
