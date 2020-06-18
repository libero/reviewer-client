import React from 'react';
import { Switch } from 'react-router-dom';
import SubmissionWizard from './SubmissionWizard';
import AuthRoute from '../../core/components/AuthRoute';
import ThankYouPage from './ThankYouPage';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <AuthRoute path="/thankyou/:id" component={ThankYouPage} />
        <AuthRoute path="/submit/:id/:step" component={SubmissionWizard} />
    </Switch>
);

export default Routes;
