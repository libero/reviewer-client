import React, { useState } from 'react';
import { PeoplePickerSelector, SelectedPeopleList } from '../molecules';
import { useTranslation } from 'react-i18next';
import useModal from '../../ui/hooks/useModal';
import { EditorAlias } from '../../initial-submission/types';

interface Props {
    people?: EditorAlias[];
    initialSelectedPeople?: string[];
    label?: string;
    required?: boolean;
    min?: number;
    max?: number;
    onChange: (selectedPeople: string[]) => void;
    className?: string;
    error?: string;
    hideLabel?: boolean;
}

const PeoplePicker = ({
    people = [],
    initialSelectedPeople = [],
    label,
    required,
    min,
    max,
    onChange,
    className,
    error,
    hideLabel = false,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const { t } = useTranslation('ui');
    const [selectedPeople, setSelectedPeople] = useState(initialSelectedPeople);
    const filteredSelected = people.filter((person): boolean => selectedPeople.includes(person.id));

    const setPeople = (peopleToSet: string[]): void => {
        setSelectedPeople(peopleToSet);
        onChange(peopleToSet);
    };

    const onRemove = (personToRemove: string): void => {
        const newSelectedPeople = selectedPeople.filter(personId => personId !== personToRemove);
        setPeople(newSelectedPeople);
    };

    return (
        <div className={`people-picker ${className ? className : ''}`}>
            {!hideLabel && <h2 className="typography__heading typography__heading--h3">{label}</h2>}
            <SelectedPeopleList
                people={filteredSelected}
                required={required && filteredSelected.length < min}
                hideSelector={filteredSelected.length === max}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText={t('people_picker--open-selector')}
            />
            <PeoplePickerSelector
                people={people}
                initiallySelected={filteredSelected.map(selected => selected.id)}
                onDone={setPeople}
                label={label}
                toggle={toggle}
                isShowing={isShowing}
                min={min}
                max={max}
            />
            {error && (
                <span className={'typography__label typography__label--helper-text typography__label--error'}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default PeoplePicker;
