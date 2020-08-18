import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import { useTranslation } from 'react-i18next';
import EditorialProcess from './EditorialProcess';
import ArticleTypes from './ArticleTypes';
import FullSubmission from './FullSubmission';
import InitialSubmission from './InitialSubmission';
import RevisedSubmission from './RevisedSubmission';
import PostDecision from './PostDecision';
import JournalPolicies from './JournalPolicies';
import JournalFAQs from './JournalFAQs';
import JournalMetrics from './JournalMetrics';
import Fees from './Fees';

const AuthorGuide = (): JSX.Element => {
    const { t } = useTranslation('author-guide');
    const { path } = useRouteMatch();
    const location = useLocation();
    const initialPath = `${path}/editorial-process`;
    const currentPath = location.pathname === path ? initialPath : location.pathname;

    return (
        <React.Fragment>
            <PageNavigation
                links={[
                    { link: initialPath, label: t('links.edit-process') },
                    { link: `${path}/types`, label: t('links.article-types') },
                    { link: `${path}/initial`, label: t('links.initial-subs') },
                    { link: `${path}/full`, label: t('links.full-subs') },
                    { link: `${path}/revised`, label: t('links.revised-subs') },
                    { link: `${path}/post`, label: t('links.post-decisions') },
                    { link: `${path}/journal-policies`, label: t('links.journal-policies') },
                    { link: `${path}/journal-faqs`, label: t('links.journal-faqs') },
                    { link: `${path}/fees`, label: t('links.fees') },
                    { link: `${path}/journal-metrics`, label: t('links.journal-metrics') },
                ]}
                currentPath={currentPath}
            />
            <div className="static-page">
                <Switch>
                    <Route path={`${path}/editorial-process`}>
                        <EditorialProcess />
                    </Route>
                    <Route path={`${path}/types`}>
                        <ArticleTypes />
                    </Route>
                    <Route path={`${path}/initial`}>
                        <InitialSubmission />
                    </Route>
                    <Route path={`${path}/full`}>
                        <FullSubmission />
                    </Route>
                    <Route path={`${path}/revised`}>
                        <RevisedSubmission />
                    </Route>
                    <Route path={`${path}/post`}>
                        <PostDecision />
                    </Route>
                    <Route path={`${path}/journal-policies`}>
                        <JournalPolicies />
                    </Route>
                    <Route path={`${path}/journal-faqs`}>
                        <JournalFAQs />
                    </Route>
                    <Route path={`${path}/fees`}>
                        <Fees />
                    </Route>
                    <Route path={`${path}/journal-metrics`}>
                        <JournalMetrics />
                    </Route>
                    <Redirect to={initialPath} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default AuthorGuide;
