import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import PersonCard from './PersonCard';

const EditorialStaff = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('editor.heading')}</h1>

            <Paragraph type="reading">{t('editor.paragraph-1')}</Paragraph>

            <div className="person-grid">
                <PersonCard
                    number={t('editor.person-1.number')}
                    position={t('editor.person-1.position')}
                    name={t('editor.person-1.name')}
                    photo={t('editor.person-1.photo')}
                />
                <PersonCard
                    number={t('editor.person-2.number')}
                    position={t('editor.person-2.position')}
                    name={t('editor.person-2.name')}
                    photo={t('editor.person-2.photo')}
                />
                <PersonCard
                    number={t('editor.person-3.number')}
                    position={t('editor.person-3.position')}
                    name={t('editor.person-3.name')}
                    photo={t('editor.person-3.photo')}
                />
                <PersonCard
                    number={t('editor.person-4.number')}
                    position={t('editor.person-4.position')}
                    name={t('editor.person-4.name')}
                    photo={t('editor.person-4.photo')}
                />
                <PersonCard
                    number={t('editor.person-5.number')}
                    position={t('editor.person-5.position')}
                    name={t('editor.person-5.name')}
                    photo={t('editor.person-5.photo')}
                />
                <PersonCard
                    number={t('editor.person-6.number')}
                    position={t('editor.person-6.position')}
                    name={t('editor.person-6.name')}
                    photo={t('editor.person-6.photo')}
                />
            </div>
        </div>
    );
};

export default EditorialStaff;
