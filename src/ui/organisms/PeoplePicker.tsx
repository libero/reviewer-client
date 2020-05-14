import React from 'react';
import { PeoplePickerSelector, SelectedPeopleList } from '../molecules';
import { useTranslation } from 'react-i18next';
import useModal from '../../ui/hooks/useModal';
import { EditorAlias } from '../../initial-submission/types';

interface Props {
    people?: EditorAlias[];
    selectedPeople?: string[];
    label: string;
    required?: boolean;
    min?: number;
    max?: number;
    onRemove: (personId: string) => void;
    setSelectedPeople: (selectedPeople: string[]) => void;
}

const PeoplePicker = ({
    people = [],
    selectedPeople = [],
    label,
    required,
    min,
    max,
    onRemove,
    setSelectedPeople,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const { t } = useTranslation('ui');
    return (
        <div className="people-picker">
            <h2 className="typography__heading typography__heading--h3">{label}</h2>
            <SelectedPeopleList
                people={people.filter((person): boolean => selectedPeople.includes(person.id))}
                required={required}
                onRemove={onRemove}
                onOpen={(): void => toggle()}
                openSelectorText={t('people_picker--open-selector')}
            />
            <PeoplePickerSelector
                people={people}
                initialySelected={selectedPeople}
                onDone={setSelectedPeople}
                label={label}
                toggle={toggle}
                isShowing={isShowing}
                min={min}
                max={max}
            />
        </div>
    );
};

export default PeoplePicker;
