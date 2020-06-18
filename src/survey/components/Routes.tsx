import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '../../core/components/AuthRoute';
import Survey from './Survey';

const Routes: React.FC = (): JSX.Element => (
    <Switch>
        <AuthRoute path="/survey/:id" component={Survey} />
    </Switch>
);

export default Routes;
