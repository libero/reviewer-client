import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('editorial.heading')}</h1>

            <Paragraph type="writing">{t('editorial.p1')}</Paragraph>
            <Paragraph type="writing">{t('editorial.p2')}</Paragraph>

            <p>TODO: pre-print component</p>

            <Paragraph type="writing">{t('editorial.p4')}</Paragraph>
            <Paragraph type="writing">{t('editorial.p5')}</Paragraph>
            <p>TODO: pre-print component</p>
            <Paragraph type="writing">{t('editorial.p5')}</Paragraph>
            <Paragraph type="writing">{t('editorial.p6')}</Paragraph>

            <p>TODO: pre-print component</p>

            <h1>{t('editorial.heading2')}</h1>
            <Paragraph type="writing">{t('editorial.p7')}</Paragraph>
            <ul>
                <li>{t('editorial.initial-sub.bullet1')}</li>
                <li>{t('editorial.initial-sub.bullet2')}</li>
                <li>{t('editorial.initial-sub.bullet3')}</li>
            </ul>

            <h1>{t('editorial.heading3')}</h1>
            <Paragraph type="writing">{t('editorial.p8')}</Paragraph>

            <h1>{t('editorial.heading4')}</h1>
            <Paragraph type="writing">{t('editorial.p9')}</Paragraph>

        </div>
    );
};

export default ContactUsElife;
