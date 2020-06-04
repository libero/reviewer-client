import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import { useTranslation } from 'react-i18next';
import EditorialProcess from './EditorialProcess';
import ArticleTypes from './ArticleTypes';
import FullSubmission from './FullSubmission';
import RevisedSubmission from './RevisedSubmission';

const AuthorGuide = (): JSX.Element => {
    const { t } = useTranslation('author-guide');
    const { path } = useRouteMatch();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="author-guide-page">
            <SideNavigation
                links={[
                    { link: `${path}/editorial-process`, label: t('links.edit-process') },
                    { link: `${path}/types`, label: t('links.article-types') },
                    { link: `${path}/initial`, label: t('links.initial-subs') },
                    { link: `${path}/full`, label: t('links.full-subs') },
                    { link: `${path}/revised`, label: t('links.revised-subs') },
                    { link: `${path}/post`, label: t('links.post-decisions') },
                    { link: `${path}/journal-policies`, label: t('links.journal-policies') },
                    { link: `${path}/fees`, label: t('links.fees') },
                    { link: `${path}/journal-metrics`, label: t('links.journal-metrics') },
                ]}
                currentPath={currentPath}
            />
            <Switch>
                <Route path={`${path}/editorial-process`}>
                    <EditorialProcess />
                </Route>
                <Route path={`${path}/types`}>
                    <ArticleTypes />
                </Route>
                <Route path={`${path}/initial`}>
                    <div />
                </Route>
                <Route path={`${path}/full`}>
                    <FullSubmission />
                </Route>
                <Route path={`${path}/revised`}>
                    <RevisedSubmission />
                </Route>
                <Route path={`${path}/post`}>
                    <div />
                </Route>
                <Route path={`${path}/journal-policies`}>
                    <div />
                </Route>
                <Route path={`${path}/fees`}>
                    <div />
                </Route>
                <Route path={`${path}/journal-metrics`}>
                    <div />
                </Route>
                <Redirect to={path + '/editorial-process'} />
            </Switch>
        </div>
    );
};

export default AuthorGuide;
