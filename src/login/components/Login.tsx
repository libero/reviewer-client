import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/welcome.jpg';
import { isUserAuthenticatedQuery } from '../../core/graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SET_LOGOUT_ERROR } from '../../initial-submission/graphql';

// https://reactrouter.com/web/example/query-parameters
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQueryParams(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}

const Login = (): JSX.Element => {
    const { t } = useTranslation('login');
    const query = useQueryParams();
    const [setLogoutError] = useMutation(SET_LOGOUT_ERROR);
    const { data = { isAuthenticated: false } } = useQuery(isUserAuthenticatedQuery);
    const loginTimeout = query.get('loginTimeout');

    // on mount check to see if a logged out event has occured.
    useEffect(() => {
        if (loginTimeout) {
            setLogoutError();
        }
    }, []);

    if (data.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-page">
            <TwoColumnLayout>
                <div>
                    <h1 className="typography__heading typography__heading--h1">{t('welcome')}</h1>

                    <div className="login-page__text">
                        <Paragraph type="writing">{t('mission-1')}</Paragraph>
                        <Paragraph type="writing">{t('mission-2')}</Paragraph>
                        <Paragraph type="writing">
                            {t('author-guide-message')}
                            <a
                                className="typography typography__body--link"
                                href="https://reviewer.elifesciences.org/author-guide"
                            >
                                {t('author-guide-link')}
                            </a>
                            .
                        </Paragraph>
                    </div>

                    <div className="login-page__buttons">
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
                </div>
                <ImageWithAttribution
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
