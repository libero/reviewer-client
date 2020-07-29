import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import '../styles/index.scss';
import Logout from '../../login/components/Logout';
import { CookieBanner, Footer, Feedback } from '../../ui/atoms';
import * as Auth from '../utils/auth';

const JournalAuthRedirect = lazy(() => import('../../login/components/JournalAuthRedirect'));
const Login =  lazy(() => import('../../login/components/Login'));
const ContactUs =  lazy(() => import('../../static-pages/components/ContactUs'));
const AuthorGuide =  lazy(() => import('../../static-pages/components/AuthorGuide'));
const ReviewerGuide =  lazy(() => import('../../static-pages/components/ReviewerGuide'));
const DashboardRoutes = lazy(() => import('../../dashboard/components/Routes'));
const InitialSubmissionRoutes = lazy(() => import('../../initial-submission/components/Routes'));
const SurveyRoutes = lazy(() => import('../../survey/components/Routes'));

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
                    <Footer />
                </React.Suspense>
            </Router>
        </ApolloProvider>
    );
};

export default App;
