import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SelectField } from '../../ui/atoms';
import { Value } from '../../ui/atoms/SelectField';

interface Props {
    links: Array<{ link: string; label: string }>;
    currentPath: string;
}

const ContactUsNavigation = ({ links, currentPath = '/' }: Props): JSX.Element => {
    let history = useHistory();
    const isSelected = (path: string): boolean => {
        return path.toLocaleLowerCase().trim() === currentPath.toLocaleLowerCase().trim();
    };

    const onChange = (value: string) => {
        history.push(value);
    };

    const dropdownLinks = links.map(l => ({ label: l.label, value: l.link }));

    return (
        <React.Fragment>
            <div className="dropdown-nav">
                <SelectField
                    labelText=""
                    id="selectedNavigationItem"
                    values={dropdownLinks}
                    onChange={(value: Value): void => onChange(value.value)}
                    defaultValue={dropdownLinks.find(dl => isSelected(dl.value))}
                    searchable={false}
                />
            </div>
            <div className="side-bar-nav">
                {links.map(l => (
                    <span>
                        <Link
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
