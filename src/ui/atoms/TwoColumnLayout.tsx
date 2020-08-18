import React from 'react';

interface Props {
    children?: JSX.Element[];
}

const TwoColumnLayout = ({ children }: Props): JSX.Element => <div className="two-column-layout">{children}</div>;

export default TwoColumnLayout;
