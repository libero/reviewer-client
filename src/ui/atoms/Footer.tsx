import React from 'react';
import { Paragraph } from './index';
import { useTranslation } from 'react-i18next';

const Footer = (): JSX.Element => {
    const { t } = useTranslation('login');
    return (
        <Paragraph type="footer">
            {t('footer-text-1')}
            <a
                className="typography typography__small--link"
                href="https://elifesciences.org/terms"
                rel="noopener noreferrer"
                target="_blank"
            >
                {t('footer-link-1')}
            </a>
            {t('footer-text-2')}
            <a
                className="typography typography__small--link"
                href="https://elifesciences.org/privacy"
                rel="noopener noreferrer"
                target="_blank"
            >
                {t('footer-link-2')}
            </a>
            .
        </Paragraph>
    );
};

export default Footer;
