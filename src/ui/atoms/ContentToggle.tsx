import React, { ReactNode, useState } from 'react';

interface Props {
    id: string;
    collapsedText: string;
    openText: string;
    children?: ReactNode;
    formComponent?: boolean;
    open?: boolean;
}

const ContentToggle = ({ id, collapsedText, openText, children, open = false }: Props): JSX.Element => {
    const [opened, setOpen] = useState(open);
    return (
        <div className="select-toggle">
            {opened && children}
            <label id={`${id}-label`} className="typography__label typography__label--primary select-toggle__label">
                <span
                    className="typography typography__small--link select-toggle__toggle-btn"
                    onClick={(): void => setOpen(!opened)}
                >
                    {!opened ? <span>{collapsedText}</span> : <span>{openText}</span>}
                </span>
            </label>
        </div>
    );
};

export default ContentToggle;
