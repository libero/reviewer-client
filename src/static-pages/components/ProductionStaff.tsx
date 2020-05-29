import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import PersonCard from './PersonCard';

const ProductionStaff = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="contact-us-content">
            <h1>{t('production.heading')}</h1>
            <Paragraph type="writing">{t('production.paragraph-1')}</Paragraph>
            <div className="person-grid">
                <PersonCard
                    number={t('production.person-1.number')}
                    position={t('production.person-1.position')}
                    name={t('production.person-1.name')}
                    photo={t('production.person-1.photo')}
                />
                <PersonCard
                    number={t('production.person-2.number')}
                    position={t('production.person-2.position')}
                    name={t('production.person-2.name')}
                    photo={t('production.person-2.photo')}
                />
            </div>
        </div>
    );
};

export default ProductionStaff;