import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

interface Props {
    links: Array<{ link: string; label: string }>;
    currentPath: string;
}

const SideNavigation = ({ links, currentPath = '/' }: Props): JSX.Element => {
    const isSelected = (path: string): boolean => {
        return path.toLocaleLowerCase().trim() === currentPath.toLocaleLowerCase().trim();
    };
    const dropdownLinks = links.map(l => ({ label: l.label, value: l.link }));
    return (
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
    );
};

export default SideNavigation;
