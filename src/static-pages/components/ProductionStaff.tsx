import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ProductionStaff = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="contact-us-content">
            <h1>{t('production.heading')}</h1>
            <Paragraph type="writing">{t('production.paragraph-1')}</Paragraph>
            <div className="person-grid">
                <div className="person-grid-item">
                    <img
                        alt={`${t('production.person-1.name')}'s profile image`}
                        src={t('production.person-1.photo')}
                    />
                    <p>{t('production.person-1.name')}</p>
                    <p>{t('production.person-1.position')}</p>
                    <p>{t('production.person-1.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img
                        alt={`${t('production.person-2.name')}'s profile image`}
                        src={t('production.person-2.photo')}
                    />
                    <p>{t('production.person-2.name')}</p>
                    <p>{t('production.person-2.position')}</p>
                    <p>{t('production.person-2.number')}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductionStaff;
