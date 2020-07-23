import React from 'react';
import { Button } from '.';
import useCookieNotification from '../hooks/useCookieNotification';
import { useTranslation } from 'react-i18next';

const CookieBanner = (): JSX.Element => {
    const { accepted, setAccepted } = useCookieNotification();

    const { t } = useTranslation('ui');
    return !accepted ? (
        <div className="cookie-banner">
            <span className="cookie-banner__text">{t('cookie-banner.copy')}</span>
            <a
                className="cookie-banner__link"
                href="https://elifesciences.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('cookie-banner.link-text')}
            </a>
            <Button className="cookie-banner__button" type="primary" onClick={setAccepted}>
                {t('cookie-banner.button-text')}
            </Button>
        </div>
    ) : null;
};

export default CookieBanner;
