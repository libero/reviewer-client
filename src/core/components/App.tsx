import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { default as DashboardRoutes } from '../../dashboard/components/Routes';
import { default as InitialSubmissionRoutes } from '../../initial-submission/components/Routes';
import { default as SurveyRoutes } from '../../survey/components/Routes';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import '../styles/index.scss';
import Logout from '../../login/components/Logout';
import { CookieBanner, Footer, Feedback } from '../../ui/atoms';
import * as Auth from '../utils/auth';
import Login from '../../login/components/Login';

const JournalAuthRedirect = lazy(() => import('../../login/components/JournalAuthRedirect'));
const ContactUs = lazy(() => import('../../static-pages/components/ContactUs'));
const AuthorGuide = lazy(() => import('../../static-pages/components/AuthorGuide'));
const ReviewerGuide = lazy(() => import('../../static-pages/components/ReviewerGuide'));

const Loader = (): JSX.Element => <div>Loading...</div>;

const App: React.FC = (): JSX.Element => {
    useEffect(() => {
        Auth.importToken();
    }, []);
    return (
        <ApolloProvider client={createApolloClient()}>
            <Router>
                <React.Suspense fallback={<Loader />}>
                    <CookieBanner />
                    <NavBar />
                    <Feedback />
                    <div className="grid">
                        <InitialSubmissionRoutes /> {/* uses Switch internally */}
                        <SurveyRoutes /> {/* uses Switch internally */}
                        <DashboardRoutes /> {/* uses Switch internally */}
                        <Switch>
                            <Route component={Login} exact path="/login" />
                            <Route component={Logout} exact path="/logout" />
                            <Route component={JournalAuthRedirect} exact path="/auth-redirect" />
                            <Route component={ContactUs} path="/contact-us" />
                            <Route component={AuthorGuide} path="/author-guide" />
                            <Route component={ReviewerGuide} path="/reviewer-guide" />
                        </Switch>
                    </div>
                    <Footer />
                </React.Suspense>
            </Router>
        </ApolloProvider>
    );
};

export default App;
