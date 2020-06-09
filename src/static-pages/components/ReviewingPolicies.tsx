import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ReviewingPolicies = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="reviewer-guide__content">
            <h1>{t('')}</h1>
        </div>
    );
};

export default ReviewingPolicies;
