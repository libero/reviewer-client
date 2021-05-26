import React, { ReactNode, useState } from 'react';

interface Props {
    id: string;
    collapsedText: string;
    openText: string;
    children?: ReactNode;
    open?: boolean;
}

const ContentToggle = ({ id, collapsedText, openText, children, open = false }: Props): JSX.Element => {
    const [opened, setOpen] = useState(open);
    return (
        <div className="content-toggle" id={id}>
            {opened && children}
            <label id={`${id}-label`} className="typography__label typography__label--primary content-toggle__label">
                <span
                    className="typography typography__small--link content-toggle__toggle-btn"
                    onClick={(): void => setOpen(!opened)}
                >
                    {!opened ? collapsedText : openText}
                </span>
            </label>
        </div>
    );
};

export default ContentToggle;
