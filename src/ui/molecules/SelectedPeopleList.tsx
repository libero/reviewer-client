import React from 'react';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { Pod } from '../atoms';
import { PersonPod } from '.';
import { useTranslation } from 'react-i18next';
import { EditorAlias } from '../../initial-submission/types';

interface Props {
    people?: EditorAlias[];
    openSelectorText: string;
    required?: boolean;
    onRemove: (personId: string) => void;
    onOpen: () => void;
}
const SelectedPeopleList = ({ people = [], openSelectorText, required, onRemove, onOpen }: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    return (
        <div className="selected_people_list">
            {people.map(
                (person: EditorAlias): JSX.Element => (
                    <div key={person.id} className="selected_people_list__item">
                        <PersonPod
                            {...person}
                            toggleHandler={onRemove}
                            selectedButtonIcon={<Delete />}
                            initiallySelected
                        />
                    </div>
                ),
            )}
            <div className="selected_people_list__item">
                <Pod onClick={onOpen} buttonIcon={<Add />} buttonText={t('selected_people_list--open')}>
                    <div className="selected_people_list__pod-content">
                        {openSelectorText} ({required ? t('validation--required') : t('validation--optional')})
                    </div>
                </Pod>
            </div>
        </div>
    );
};

export default SelectedPeopleList;
