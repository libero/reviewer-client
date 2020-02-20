import React from 'react';
import { Redirect } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/welcome.jpg';
import { isUserAuthenticatedQuery } from '../../core/graphql';
import { useQuery } from '@apollo/react-hooks';

const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const { data = { isAuthenticated: false } } = useQuery(isUserAuthenticatedQuery);

    if (data.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-page">
            <TwoColumnLayout>
                <div>
                    <h1 className="typography__heading typography__heading--h1">{t('login:welcome')}</h1>

                    <div className="login-page__text">
                        <Paragraph type="writing">{t('login:mission-1')}</Paragraph>
                        <Paragraph type="writing">{t('login:mission-2')}</Paragraph>
                        <Paragraph type="writing">
                            {t('login:author-guide-message')}
                            <a
                                className="typography typography__body--link"
                                href="https://reviewer.elifesciences.org/author-guide"
                            >
                                {t('login:author-guide-link')}
                            </a>
                            .
                        </Paragraph>
                    </div>

                    <div className="login-page__buttons">
                        <a className="login-page__buttons--orcid" href={CONFIG.LOGIN_URL}>
                            <Button type="orcid">{t('login:login-orcid')}</Button>
                        </a>
                        <Paragraph type="writing">
                            {t('login:sign-up-message-1')}
                            <a className="typography typography__body--link" href="https://orcid.org/register">
                                {t('login:sign-up-link')}
                            </a>
                            {t('login:sign-up-message-2')}
                        </Paragraph>
                    </div>
                </div>
                <ImageWithAttribution
                    image={Image}
                    artistName={t('login:image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="left"
                />
            </TwoColumnLayout>
        </div>
    );
};

export default Login;
