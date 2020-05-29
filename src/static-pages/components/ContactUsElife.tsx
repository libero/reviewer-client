import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="contact-us-content">
            <h1>{t('contact-elife.heading')}</h1>

            <Paragraph type="writing">
                {t('contact-elife.paragraph-1')}
            </Paragraph>

            <ul>
                <li>{t('contact-elife.editor-email')}</li>
                <li>{t('contact-elife.production-email')}</li>
            </ul>

            <Paragraph type="writing">{t('contact-elife.media-inquiries-paragraph')}</Paragraph>

            <ul>
                <li>{t('contact-elife.press-email')}</li>
            </ul>
        </div>
    );
};

export default ContactUsElife;
