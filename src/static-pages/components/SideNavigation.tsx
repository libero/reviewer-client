import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    links: Array<{ link: string; label: string }>;
    currentPath: string;
}

const ContactUsNavigation = ({ links, currentPath = '/' }: Props): JSX.Element => {
    const isSelected = (path: string): boolean => {
        console.log('currentPath', currentPath);
        console.log('path', path);
        return path.toLocaleLowerCase().trim() === currentPath.toLocaleLowerCase().trim();
    };

    return (
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
    );
};

export default ContactUsNavigation;
