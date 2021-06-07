import React, { ReactNode } from 'react';
import { SelectField } from '../atoms';

interface Props {
    id: string;
    children?: ReactNode;
    toggleLabel: string;
    open?: boolean;
    onToggle?: Function;
}

const ToggleComponent = ({ open = false }: Props): JSX.Element => {
    return (
        <div className="toggle">
            <span className="burger">Test</span>
            <SelectField id="" values={[]} labelText=""></SelectField>
        </div>
    );
};

export default ToggleComponent;
