import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import { default as SurveyRoutes } from '../../survey/components/Routes';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import Login from '../../login/components/Login';
import ContactUs from '../../static-pages/components/ContactUs';
import AuthorGuide from '../../static-pages/components/AuthorGuide';
import ReviewerGuide from '../../static-pages/components/ReviewerGuide';
import JournalAuthRedirect from '../../login/components/JournalAuthRedirect';
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
        <ApolloProvider client={createApolloClient()}>
            <Router>
                <React.Suspense fallback={<Loader />}>
                    <NavBar />
                    <Route component={Login} exact path="/login" />
                    <Route component={Logout} exact path="/logout" />
                    <Route component={JournalAuthRedirect} exact path="/auth-redirect" />
                    <InitialSubmissionRoutes />
                    <SurveyRoutes />
                    <DashboardRoutes />
                    <Route component={ContactUs} path="/contact-us" />
                    <Route component={AuthorGuide} path="/author-guide" />
                    <Route component={ReviewerGuide} path="/reviewer-guide" />
                    <Footer />
                </React.Suspense>
            </Router>
        </ApolloProvider>
    );
};

export default App;
