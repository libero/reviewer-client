import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import ContactUsNavigation from './ContactUsNavigation';
import ContactUsElife from './ContactUsElife';
import EditorialStaff from './EditorialStaff';
import ProductionStaff from './ProductionStaff';

const ContactUs = (): JSX.Element => {
    let { path } = useRouteMatch();

    return (
        <div className="login-page">
            <div>
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
            </div>
        </div>
    );
};

export default ContactUs;
