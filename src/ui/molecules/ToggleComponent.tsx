import React, { ReactNode } from 'react';
import { ContentToggle, SelectField } from '../atoms';

export interface Value {
    label: string;
    value: string;
}

interface Props {
    id: string;
    selectId: string;
    children?: ReactNode;
    labelText: string;
    openText: string;
    collapsedText: string;
    questionTitle: string;
    defaultValue?: Value;
    values?: Value[];
}

const ToggleComponent = ({
    id,
    selectId,
    collapsedText,
    openText,
    questionTitle,
    labelText,
    defaultValue,
    values,
}: Props): JSX.Element => {
    return (
        <div className="toggle-component" id={id}>
            <h3>{questionTitle}</h3>
            <SelectField id={selectId} labelText={labelText} defaultValue={defaultValue} values={values}></SelectField>
            <ContentToggle id={id} collapsedText={collapsedText} openText={openText}></ContentToggle>
        </div>
    );
};

export default ToggleComponent;
