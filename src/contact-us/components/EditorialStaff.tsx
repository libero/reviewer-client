import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const EditorialStaff = (): JSX.Element => {
    const { t } = useTranslation('contactus');

    return (
        <div>
            <h1>Editor</h1>
        </div>
    );
};

export default EditorialStaff;
