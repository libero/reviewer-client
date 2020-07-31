import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
const SubmissionWizard = lazy(() => import('./SubmissionWizard'));
const AuthRoute = lazy(() => import('../../core/components/AuthRoute'));
const ThankYouPage = lazy(() => import('./ThankYouPage'));

const Routes: React.FC = (): JSX.Element => (
    <Suspense fallback={<div />}>
        <Switch>
            <AuthRoute path="/thankyou/:id" component={ThankYouPage} />
            <AuthRoute path="/submit/:id/:step" component={SubmissionWizard} />
        </Switch>
    </Suspense>
);

export default Routes;
