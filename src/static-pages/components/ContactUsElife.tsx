import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('contact-elife.heading')}</h1>

            <Paragraph type="reading">{t('contact-elife.paragraph-1')}</Paragraph>

            <ul>
                <li>{t('contact-elife.editor-email')}</li>
                <li>{t('contact-elife.production-email')}</li>
            </ul>

            <Paragraph type="reading">{t('contact-elife.media-inquiries-paragraph')}</Paragraph>

            <ul>
                <li>{t('contact-elife.press-email')}</li>
            </ul>
        </div>
    );
};

export default ContactUsElife;
