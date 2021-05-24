import React, { ReactNode, useState } from 'react';

interface Props {
    id: string;
    collapsedText: string;
    openText: string;
    children?: ReactNode;
    formComponent?: boolean;
}

const ContentToggle = ({ id, collapsedText, openText, children }: Props): JSX.Element => {
    const [open, setOpen] = useState(false);
    return (
        <div className="select-toggle">
            {open && <div>{children}</div>}
            <label id={`${id}-label`} className="typography__label typography__label--primary select-toggle__label">
                <span
                    className="typography typography__small--link select-toggle__toggle-btn"
                    onClick={(): void => setOpen(!open)}
                >
                    {!open ? <span>{collapsedText}</span> : <span>{openText}</span>}
                </span>
            </label>
        </div>
    );
};

export default ContentToggle;
