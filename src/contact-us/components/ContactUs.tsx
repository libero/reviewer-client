import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout } from '../../ui/atoms';
import ContactUsNavigation from './ContactUsNavigation';
import ContactUsElife from './ContactElife';
import EditorialStaff from './EditorialStaff';
import ProductionStaff from './ProductionStaff';

const ContactUs = (): JSX.Element => {
    const { t } = useTranslation('contactus');
    let { path } = useRouteMatch();

    return (
        <div className="login-page">
            <TwoColumnLayout>
                <ContactUsNavigation />
                <div>
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
            </TwoColumnLayout>
        </div>
    );
};

export default ContactUs;
