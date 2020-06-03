import React from 'react';

interface Props {
    name: string;
    photo: string;
    position: string;
    number: string;
}

const PersonCard = ({ name, photo, position, number }: Props): JSX.Element => {
    return (
        <div className="person-grid-item">
            <img alt={`${name}'s profile image`} src={photo} />
            <div className="person-name">{name}</div>
            <div>{position}</div>
            <div>{number}</div>
        </div>
    );
};

export default PersonCard;
