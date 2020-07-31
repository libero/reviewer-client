import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonPod, SearchField, SelectedOption } from '.';
import { Modal, Banner } from '../atoms';
import useDebounce from '../hooks/useDebounce';
import { EditorAlias } from '../../initial-submission/types';

interface Props {
    people?: EditorAlias[];
    initiallySelected?: string[];
    onDone: (selectedPeople: string[]) => void;
    label: string;
    toggle: Function;
    isShowing: boolean;
    min?: number;
    max?: number;
}

const PeoplePickerSelector = ({
    initiallySelected = [],
    people = [],
    onDone,
    label,
    isShowing,
    toggle,
    min,
    max,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    const [locallySelected, setLocallySelected] = useState(initiallySelected);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
    const [filteredPeople, setFilteredPeople] = useState(people);

    const onSearch = (searchTerm: string): void => {
        if (!searchTerm) {
            setFilteredPeople(people);
            return;
        }

        setFilteredPeople(
            people.filter(person => {
                const searchableExpertises = person.expertises ? person.expertises.join(' ') : '';
                const searchableFocuses = person.focuses ? person.focuses.join(' ') : '';
                return (
                    person.name.toLowerCase().includes(searchTerm) ||
                    (person.aff && person.aff.toLowerCase().includes(searchTerm)) ||
                    searchableFocuses.toLowerCase().includes(searchTerm) ||
                    searchableExpertises.toLowerCase().includes(searchTerm)
                );
            }),
        );
    };

    // don't run onSearch on first render
    const isFirstRender = useRef(true);

    useEffect((): void => {
        if (!isShowing) {
            setLocallySelected(initiallySelected);
        }
    }, [initiallySelected, isShowing]);

    useEffect((): void => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    useEffect(() => setFilteredPeople(people), [people]);

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
            buttonDisabled={!!min && locallySelected.length < min}
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
                        placeholder={t('people_picker--search-placeholder')}
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
                    {filteredPeople.map(
                        (person): React.ReactNode => {
                            const selected = locallySelected.includes(person.id);
                            return (
                                <div key={person.id} className="people-picker__modal_list--item">
                                    <PersonPod {...person} toggleHandler={togglePerson} initiallySelected={selected} />
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
