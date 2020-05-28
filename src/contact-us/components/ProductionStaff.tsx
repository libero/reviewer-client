import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ProductionStaff = (): JSX.Element => {
    const { t } = useTranslation('contactus');

    return (
        <div>
            <h1>Production</h1>
        </div>
    );
};

export default ProductionStaff;
