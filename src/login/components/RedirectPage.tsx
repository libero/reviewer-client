import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/redirect.jpg';

const Login = (): JSX.Element => {
    const { t } = useTranslation('redirect');


    return (
        <div className="login-page">
            <TwoColumnLayout>
                <h1 className="typography__heading typography__heading--h1 two-column-layout__left">We're redirecting you</h1>

                <div className="login-page__text two-column-layout__left">
                    <Paragraph type="writing">{t('mission-1')}</Paragraph>
                    <Paragraph type="writing">{t('mission-2')}</Paragraph>
                    <Paragraph type="writing">
                        {t('author-guide-message')}
                        <a className="typography typography__body--link" href="/author-guide">
                            {t('author-guide-link')}
                        </a>
                        .
                    </Paragraph>
                </div>

                <div className="login-page__buttons two-column-layout__left">
                    <a className="login-page__buttons--orcid" href="/auth-login">
                        <Button type="orcid">{t('login-orcid')}</Button>
                    </a>
                    <Paragraph type="writing">
                        {t('sign-up-message-1')}
                        <a className="typography typography__body--link" href="https://orcid.org/register">
                            {t('sign-up-link')}
                        </a>
                        {t('sign-up-message-2')}
                    </Paragraph>
                </div>
                <ImageWithAttribution
                    className="two-column-layout__right two-column-layout__full_column"
                    image={Image}
                    artistName={t('image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="left"
                />
            </TwoColumnLayout>
        </div>
    );
};

export default Login;
