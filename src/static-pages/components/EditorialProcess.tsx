import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('editorial.editorial.heading')}</h1>

            <Paragraph type="writing">{t('editorial.editorial.p1')}</Paragraph>
            <Paragraph type="writing">{t('editorial.editorial.p2')}</Paragraph>

            <div className="blue-box">
                <h1>{t('editorial.editorial.pre-print.heading')}</h1>
                <Paragraph type="writing">{t('editorial.editorial.pre-print.p2')}</Paragraph>
                <Paragraph type="writing">{t('editorial.editorial.pre-print.p2')}</Paragraph>
            </div>
            <Paragraph type="writing">{t('editorial.editorial.p3')}</Paragraph>
            <Paragraph type="writing">{t('editorial.editorial.p4')}</Paragraph>

            <div className="blue-box">
                <Paragraph type="writing">{t('editorial.editorial.p5')}</Paragraph>
            </div>
            <Paragraph type="writing">{t('editorial.editorial.p6')}</Paragraph>

            <h1>{t('editorial.initial-sub.heading')}</h1>
            <Paragraph type="writing">{t('editorial.initial-sub.p1')}</Paragraph>
            <ul>
                <li>{t('editorial.initial-sub.bullet1')}</li>
                <li>{t('editorial.initial-sub.bullet2')}</li>
                <li>{t('editorial.initial-sub.bullet3')}</li>
            </ul>

            <h1>{t('editorial.full-sub.heading')}</h1>
            <Paragraph type="writing">{t('editorial.full-sub.p1')}</Paragraph>

            <h1>{t('editorial.revised-sub.heading')}</h1>
            <Paragraph type="writing">{t('editorial.revised-sub.p1')}</Paragraph>
        </div>
    );
};

export default ContactUsElife;
