import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
const Dashboard = lazy(() => import('./Dashboard'));
const AuthRoute = lazy(() => import('../../core/components/AuthRoute'));

const Routes: React.FC = (): JSX.Element => (
    <Suspense fallback={<div />}>
        <Switch>
            <AuthRoute exact path="/" component={Dashboard} />
        </Switch>
    </Suspense>
);

export default Routes;
