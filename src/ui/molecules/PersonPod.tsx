import React from 'react';
import { Pod, Modal } from '../atoms';
import PersonInfo from './PersonInfo';
import Add from '@material-ui/icons/Add';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Info from '@material-ui/icons/Info';
import useModal from '../../ui/hooks/useModal';
import { EditorAlias } from '../../initial-submission/types';

interface Props extends EditorAlias {
    initiallySelected?: boolean;
    toggleHandler(id: string, selected: boolean): void;
    selectedButtonIcon?: JSX.Element;
}

const PersonPod = ({
    id,
    initiallySelected = false,
    toggleHandler,
    aff,
    name,
    focuses = [],
    expertises = [],
    selectedButtonIcon = <CheckCircle data-selected="true" fontSize="large" className="person-pod__selected_icon" />,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();

    const onClick = (id: string): void => {
        toggleHandler(id, !initiallySelected);
    };
    const commaSeperatedTags = [...focuses, ...expertises].join(', ');
    return (
        <Pod
            buttonIcon={initiallySelected ? selectedButtonIcon : <Add />}
            buttonText={initiallySelected ? 'Remove' : 'Add'}
            onClick={(): void => onClick(id)}
        >
            <Modal
                hide={toggle}
                isShowing={isShowing}
                onAccept={(): void => onClick(id)}
                buttonType="primary"
                buttonText={`${initiallySelected ? 'Remove' : 'Add'} Editor`}
            >
                <PersonInfo name={name} aff={aff} focuses={focuses} expertises={expertises} />
            </Modal>
            <div className="person-pod__text">
                <span className="typography__body typography__body--primary typography__body--no-margin">{name}</span>
                <span className="typography__small typography__small--primary typography__small--no-margin">{aff}</span>
                <div className="person-pod__inline_text">
                    <Info
                        aria-label="Info"
                        className="person-pod__info_icon"
                        fontSize="small"
                        onClick={(): void => toggle()}
                    />
                    <span className="typography__small typography__small--secondary typography__small--no-margin">
                        {commaSeperatedTags}
                    </span>
                </div>
            </div>
        </Pod>
    );
};

export default PersonPod;
