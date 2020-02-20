import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import Login from '../../login/components/Login';
import JournalAuthRedirect from '../../login/components/JournalAuthRedirect';
import '@khanacademy/tota11y';
import '../styles/index.scss';
import Logout from '../../login/components/Logout';
import { Footer } from '../../ui/atoms';
import * as Auth from '../utils/auth';

const Loader = (): JSX.Element => <div>Loading...</div>;

const App: React.FC = (): JSX.Element => {
    useEffect(() => {
        Auth.importToken();
    }, []);
    return (
        <ApolloProvider client={createApolloClient(CONFIG.API_HOST)}>
            <Router>
                <React.Suspense fallback={<Loader />}>
                    <NavBar />
                    <Route component={Login} exact path="/login" />
                    <Route component={Logout} exact path="/logout" />
                    <Route component={JournalAuthRedirect} exact path="/auth-redirect" />
                    <InitialSubmissionRoutes />
                    <DashboardRoutes />
                    <Footer />
                </React.Suspense>
            </Router>
        </ApolloProvider>
    );
};

export default App;
