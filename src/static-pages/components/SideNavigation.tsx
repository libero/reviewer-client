import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    links: Array<{ link: string; label: string }>;
    currentPath: string;
}

const SideNavigation = ({ links, currentPath = '/' }: Props): JSX.Element => {
    const isSelected = (path: string): boolean => {
        return path.toLocaleLowerCase().trim() === currentPath.toLocaleLowerCase().trim();
    };
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
