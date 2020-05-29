import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const EditorialStaff = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="contact-us-content">
            <h1>{t('editor.heading')}</h1>

            <Paragraph type="writing">{t('editor.paragraph-1')}</Paragraph>

            <div className="person-grid">
                <div className="person-grid-item">
                    <img alt={`${t('editor.person-1.name')}'s profile image`} src={t('editor.person-1.photo')} />
                    <p>{t('editor.person-1.name')}</p>
                    <p>{t('editor.person-1.position')}</p>
                    <p>{t('editor.person-1.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img alt={`${t('editor.person-2.name')}'s profile image`} src={t('editor.person-2.photo')} />
                    <p>{t('editor.person-2.name')}</p>
                    <p>{t('editor.person-2.position')}</p>
                    <p>{t('editor.person-2.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img alt={`${t('editor.person-3.name')}'s profile image`} src={t('editor.person-3.photo')} />
                    <p>{t('editor.person-3.name')}</p>
                    <p>{t('editor.person-3.position')}</p>
                    <p>{t('editor.person-3.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img alt={`${t('editor.person-4.name')}'s profile image`} src={t('editor.person-4.photo')} />
                    <p>{t('editor.person-4.name')}</p>
                    <p>{t('editor.person-4.position')}</p>
                    <p>{t('editor.person-4.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img alt={`${t('editor.person-5.name')}'s profile image`} src={t('editor.person-5.photo')} />
                    <p>{t('editor.person-5.name')}</p>
                    <p>{t('editor.person-5.position')}</p>
                    <p>{t('editor.person-5.number')}</p>
                </div>

                <div className="person-grid-item">
                    <img alt={`${t('editor.person-6.name')}'s profile image`} src={t('editor.person-6.photo')} />
                    <p>{t('editor.person-6.name')}</p>
                    <p>{t('editor.person-6.position')}</p>
                    <p>{t('editor.person-6.number')}</p>
                </div>
            </div>
        </div>
    );
};

export default EditorialStaff;
