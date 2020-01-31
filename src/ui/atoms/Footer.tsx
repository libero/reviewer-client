import React from 'react';
import { Paragraph } from './index';
import { useTranslation } from 'react-i18next';

const Footer = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Paragraph type="footer">
            {t('login:footer-text-1')}
            <a
                className="typography typography__small--link"
                href="https://elifesciences.org/terms"
                rel="noopener noreferrer"
                target="_blank"
            >
                {t('login:footer-link-1')}
            </a>
            {t('login:footer-text-2')}
            <a
                className="typography typography__small--link"
                href="https://elifesciences.org/privacy"
                rel="noopener noreferrer"
                target="_blank"
            >
                {t('login:footer-link-2')}
            </a>
            .
        </Paragraph>
    );
};

export default Footer;
