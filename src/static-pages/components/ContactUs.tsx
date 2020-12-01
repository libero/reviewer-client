import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import ContactUsElife from './ContactUsElife';
import { useTranslation } from 'react-i18next';

const ContactUs = (): JSX.Element => {
    const { t } = useTranslation('contact-us');
    const { path } = useRouteMatch();
    const location = useLocation();
    const initialPath = `${path}/contact-elife`;
    const currentPath = location.pathname === path ? initialPath : location.pathname;

    return (
        <React.Fragment>
            <PageNavigation
                links={[{ link: initialPath, label: t('links.contact-elife-link') }]}
                currentPath={currentPath}
            />
            <div className="static-page">
                <Switch>
                    <Route path={`${path}/contact-elife`}>
                        <ContactUsElife />
                    </Route>
                    <Redirect to={initialPath} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ContactUs;
