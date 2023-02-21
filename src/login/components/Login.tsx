import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/welcome.jpg';
import { isUserAuthenticatedQuery } from '../../core/graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SET_LOGOUT_ERROR } from '../../initial-submission/graphql';
import Interweave from 'interweave';

const Login = (): JSX.Element => {
    const { t } = useTranslation('login');
    const query = new URLSearchParams(useLocation().search);
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
        return <Redirect to="/?loginTimeout=true" />;
    }

    return (
        <div className="login-page">
            <TwoColumnLayout>
                <h1 className="typography__heading typography__heading--h1 two-column-layout__left">{t('welcome')}</h1>

                <div className="login-page__text two-column-layout__left">
                    <Paragraph type="writing">{t('mission-1')}</Paragraph>
                    <Paragraph type="writing">
                        <Interweave content={t('mission-2')} />
                    </Paragraph>
                </div>

                <div className="login-page__buttons two-column-layout__left">
                    <a className="login-page__buttons--orcid" href="https://elifesciences.org/submit-your-research">
                        <Button type="primary">{t('new-submit')}</Button>
                    </a>
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
