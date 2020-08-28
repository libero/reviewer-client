import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
const Dashboard = lazy(() => import('./Dashboard'));
const AuthRoute = lazy(() => import('../../core/components/AuthRoute'));

const Routes: React.FC = (): JSX.Element => (
    // <Switch>
        <AuthRoute exact path="/" component={Dashboard} />
    // </Switch>
);

export default Routes;
