import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import ContactUsNavigation from './SideNavigation';
import ContactUsElife from './ContactUsElife';
import EditorialStaff from './EditorialStaff';
import ProductionStaff from './ProductionStaff';

const ContactUs = (): JSX.Element => {
    let { path } = useRouteMatch();

    return (
        <div className="login-page">
            <div>
                <ContactUsNavigation
                    links={[
                        { link: `${path}/contact-elife`, label: 'Contact eLife' },
                        { link: `${path}/editorial-staff`, label: 'Editorial Staff' },
                        { link: `${path}/production-staff`, label: 'Production Staff' },
                    ]}
                />
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
