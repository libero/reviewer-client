import React from 'react';
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
import { AppProvider } from '../providers/AppProvider';
import { Footer } from '../../ui/atoms';
import { getToken } from '../../login/utils/tokenUtils';

const Loader = (): JSX.Element => <div>Loading...</div>;

const App: React.FC = (): JSX.Element => {
    return (
        <AppProvider>
            <ApolloProvider client={createApolloClient(CONFIG.API_HOST, getToken())}>
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
        </AppProvider>
    );
};

export default App;
