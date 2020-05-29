import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import ContactUsNavigation from './SideNavigation';
import ContactUsElife from './ContactUsElife';
import EditorialStaff from './EditorialStaff';
import ProductionStaff from './ProductionStaff';
import { useTranslation } from 'react-i18next';

const ContactUs = (): JSX.Element => {
    const { t } = useTranslation('contact-us');
    const { path } = useRouteMatch();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="contact-us-page">
            <ContactUsNavigation
                links={[
                    { link: `${path}/contact-elife`, label: t('links.contact-elife-link') },
                    { link: `${path}/editorial-staff`, label: t('links.editors-link') },
                    { link: `${path}/production-staff`, label: t('links.production-link') },
                ]}
                currentPath={currentPath}
            />
            <Switch>
                <Route path={`${path}/contact-elife`}>
                    <ContactUsElife />
                </Route>
                <Route path={`${path}/editorial-staff`}>
                    <EditorialStaff />
                </Route>
                <Route path={`${path}/production-staff`}>
                    <ProductionStaff />
                </Route>
                <Redirect to={path + '/contact-elife'} />
            </Switch>
        </div>
    );
};

export default ContactUs;
