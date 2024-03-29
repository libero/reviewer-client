import React, { useEffect, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import NavBar from './NavBar';
import createApolloClient from '../utils/createApolloClient';
import '../styles/index.scss';
import Logout from '../../login/components/Logout';
import { Footer, Feedback } from '../../ui/atoms';
import * as Auth from '../utils/auth';
import Login from '../../login/components/Login';
import useTrackingHook from './useTrackingHook';
import ErrorPage from './ErrorPage';
import ErrorBoundary from './ErrorBoundary';
import Spinner from '../../ui/atoms/Spinner';
import { CLEAR_ERROR } from '../../initial-submission/graphql';
import NotSupportedBrowser from '../../ui/organisms/NotSupportedBrowser';
import RedirectPage from '../../login/components/RedirectPage';

const AuthRoute = lazy(() => import('./AuthRoute'));
const JournalAuthRedirect = lazy(() => import('../../login/components/JournalAuthRedirect'));
const ContactUs = lazy(() => import('../../static-pages/components/ContactUs'));
const AuthorGuide = lazy(() => import('../../static-pages/components/AuthorGuide'));
const ReviewerGuide = lazy(() => import('../../static-pages/components/ReviewerGuide'));
const Dashboard = lazy(() => import('../../dashboard/components/Dashboard'));
const Survey = lazy(() => import('../../survey/components/Survey'));
const ThankYouPage = lazy(() => import('../../initial-submission/components/ThankYouPage'));
const SubmissionWizard = lazy(() => import('../../initial-submission/components/SubmissionWizard'));
const InfoPage = lazy(() => import('../../initial-submission/components/InfoPage'));

const Loader = (): JSX.Element => (
    <div className="app-spinner">
        <Spinner />
    </div>
);

const AppRoutes: React.FC = (): JSX.Element => {
    const query = new URLSearchParams(useLocation().search);
    const [isIE11, setIsIE11] = useState(false);
    const [clearError] = useMutation(CLEAR_ERROR);
    useTrackingHook();

    useEffect(() => {
        if (query.toString().length === 0) {
            clearError();
        }
    }, [window.location.href]);

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
        setIsIE11(navigator.userAgent.includes('Trident/7.0'));
    }, []);

    if (isIE11) {
        return (
            <React.Suspense fallback={<Loader />}>
                <NotSupportedBrowser />{' '}
            </React.Suspense>
        );
    }

    return (
        <React.Suspense fallback={<Loader />}>
            <NavBar />
            <Feedback />
            <div className="grid">
                <Switch>
                    <AuthRoute exact path="/" component={Dashboard} />
                    <AuthRoute path="/survey/:id" component={Survey} />
                    <AuthRoute path="/thankyou/:id" component={ThankYouPage} />
                    <AuthRoute path="/info/:id" component={InfoPage} />
                    <AuthRoute path="/submit/:id/:step" component={SubmissionWizard} />
                    <Route component={Login} exact path="/login" />
                    <Route component={Logout} exact path="/logout" />
                    <Route component={JournalAuthRedirect} exact path="/auth-redirect" />
                    <Route component={ContactUs} path="/contact-us" />
                    <Route component={AuthorGuide} path="/author-guide" />
                    <Route component={ReviewerGuide} path="/reviewer-guide" />
                    <Route component={RedirectPage} path="/redirect" />
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
