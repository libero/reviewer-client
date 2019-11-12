import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import Login from '../../login/components/Login';
import { getToken } from '../../login/utils/tokenUtils';
import '@khanacademy/tota11y';
import '../styles/index.scss';

const authToken = getToken();

const Loader = (): JSX.Element => <div>Loading...</div>;

const App: React.FC = (): JSX.Element => (
    <div>
        <ApolloProvider client={createApolloClient(CONFIG.API_HOST, authToken)}>
            <Router>
                <React.Suspense fallback={<Loader />}>
                    <NavBar />
                    <Route component={Login} exact path="/login"></Route>
                    <div className="site-content">
                        <InitialSubmissionRoutes />
                        <DashboardRoutes />
                    </div>
                </React.Suspense>
            </Router>
        </ApolloProvider>
    </div>
);

export default App;
