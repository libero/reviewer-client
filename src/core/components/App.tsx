import React, { useEffect, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import '../styles/index.scss';
import Logout from '../../login/components/Logout';
import { CookieBanner, Footer, Feedback } from '../../ui/atoms';
import * as Auth from '../utils/auth';
import Login from '../../login/components/Login';
import useTrackingHook from './useTrackingHook';
import ErrorPage from './ErrorPage';
import ErrorBoundary from './ErrorBoundary';

const AuthRoute = lazy(() => import('./AuthRoute'));
const JournalAuthRedirect = lazy(() => import('../../login/components/JournalAuthRedirect'));
const ContactUs = lazy(() => import('../../static-pages/components/ContactUs'));
const AuthorGuide = lazy(() => import('../../static-pages/components/AuthorGuide'));
const ReviewerGuide = lazy(() => import('../../static-pages/components/ReviewerGuide'));
const Dashboard = lazy(() => import('../../dashboard/components/Dashboard'));
const Survey = lazy(() => import('../../survey/components/Survey'));
const ThankYouPage = lazy(() => import('../../initial-submission/components/ThankYouPage'));
const SubmissionWizard = lazy(() => import('../../initial-submission/components/SubmissionWizard'));

const Loader = (): JSX.Element => <div>Loading...</div>;

const AppRoutes: React.FC = (): JSX.Element => {
    useTrackingHook();
    return (
        <React.Suspense fallback={<Loader />}>
            <CookieBanner />
            <NavBar />
            <Feedback />
            <div className="grid">
                <Switch>
                    <AuthRoute exact path="/" component={Dashboard} />
                    <AuthRoute path="/survey/:id" component={Survey} />
                    <AuthRoute path="/thankyou/:id" component={ThankYouPage} />
                    <AuthRoute path="/submit/:id/:step" component={SubmissionWizard} />
                    <Route component={Login} exact path="/login" />
                    <Route component={Logout} exact path="/logout" />
                    <Route component={JournalAuthRedirect} exact path="/auth-redirect" />
                    <Route component={ContactUs} path="/contact-us" />
                    <Route component={AuthorGuide} path="/author-guide" />
                    <Route component={ReviewerGuide} path="/reviewer-guide" />
                    <Route component={ErrorPage} /> {/* default not found route */}
                </Switch>
            </div>
            <Footer />
        </React.Suspense>
    );
};

const App: React.FC = (): JSX.Element => {
    useEffect(() => {
        Auth.importToken();
    }, []);
    return (
        <ErrorBoundary>
            <ApolloProvider client={createApolloClient()}>
                <Router>
                    <AppRoutes />
                </Router>
            </ApolloProvider>
        </ErrorBoundary>
    );
};

export default App;
