import React, { ReactNode } from 'react';

type ParagraphType = 'small' | 'reading' | 'writing' | 'footer';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
    secondary?: boolean;
    type: ParagraphType;
}
const Paragraph = ({ children, type, secondary, className, ...rest }: Props): JSX.Element => {
    let classes = className || '';
    switch (type) {
        case 'small':
            classes = `${classes} typography__small ${
                secondary ? 'typography__small--secondary' : 'typography__small--primary'
            }`;
            break;
        case 'writing':
            classes = `${classes} typography__body ${
                secondary ? 'typography__body--secondary' : 'typography__body--primary'
            }`;
            break;
        case 'reading':
            classes = `${classes} typography__serif ${
                secondary ? 'typography__serif--secondary' : 'typography__serif--primary'
            }`;
            break;
        case 'footer':
            classes = `${classes} typography__small typography__small--secondary paragraph--footer`;
            break;
    }

    return (
        <p {...rest} className={classes}>
            {children}
        </p>
    );
};

export default Paragraph;
