import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonPod, SearchField, SelectedOption } from '.';
import { Modal, Banner } from '../atoms';
import useDebounce from '../hooks/useDebounce';
import { EditorAlias } from '../../initial-submission/types';

interface Props {
    people?: EditorAlias[];
    initialySelected?: string[];
    onDone: (selectedPeople: string[]) => void;
    onSearch: (value: string) => void;
    label: string;
    toggle: Function;
    isShowing: boolean;
    min?: number;
    max?: number;
}

const PeoplePickerSelector = ({
    initialySelected = [],
    people = [],
    onDone,
    onSearch,
    label,
    isShowing,
    toggle,
    min,
    max,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const [locallySelected, setLocallySelected] = useState(initialySelected);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

    // don't run onSearch on first render
    const isFirstRender = useRef(true);

    useEffect((): void => {
        setLocallySelected(initialySelected);
    }, [initialySelected, isShowing]);

    useEffect((): void => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const accept = (): void => {
        onDone(locallySelected);
    };
    const togglePerson = (id: string, selected: boolean): void => {
        if (selected && (!max || locallySelected.length < max)) {
            setLocallySelected([...locallySelected, id]);
        } else {
            setLocallySelected(locallySelected.filter((listId: string): boolean => listId !== id));
        }
    };

    return (
        <Modal
            hide={toggle}
            isShowing={isShowing}
            onAccept={accept}
            fullscreen={true}
            buttonType="primary"
            buttonText="Add"
            buttonDisabled={min && locallySelected.length < min}
        >
            {max && locallySelected.length >= max ? (
                <Banner>{`${t('validation--peoplepicker_maximum-prefix')} ${max} ${t(
                    'validation--peoplepicker_maximum-suffix',
                )}`}</Banner>
            ) : null}
            <div className="main-content--centered people-picker__selector_container">
                <h2 className="typography__heading typography__heading--h2">{label}</h2>
                <div className="people-picker__search_box">
                    <SearchField
                        id="peoplePickerSearch"
                        onChange={(event: React.FormEvent<HTMLInputElement>): void => {
                            setSearchTerm(event.currentTarget.value);
                        }}
                    />
                    <span className="typography__body--primary people-picker__guidance">
                        {min
                            ? `${t('validation--peoplepicker_guidance-prefix')} ${min} ${t(
                                  'validation--peoplepicker_guidance-suffix',
                              )}`
                            : null}
                    </span>
                </div>
                <div className="people-picker__selected-tabs">
                    {locallySelected.map(
                        (selectedPersonId): JSX.Element => {
                            const selectedPerson = people.find((person): boolean => person.id === selectedPersonId);
                            return (
                                <div className="people-picker__selected-tab" key={selectedPersonId}>
                                    <SelectedOption
                                        text={selectedPerson.name}
                                        onClose={(): void => {
                                            togglePerson(selectedPersonId, false);
                                        }}
                                    />
                                </div>
                            );
                        },
                    )}
                </div>
                <div className="people-picker__modal_list">
                    {people.map(
                        (person): React.ReactNode => {
                            const selected = locallySelected.includes(person.id);
                            return (
                                <div key={person.id} className="people-picker__modal_list--item">
                                    <PersonPod {...person} toggleHandler={togglePerson} initialySelected={selected} />
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PeoplePickerSelector;
