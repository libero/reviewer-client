import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import { useTranslation } from 'react-i18next';
import WritingReview from './WritingReview';
import ReviewingPolicies from './ReviewingPolicies';
import ReviewProcess from './ReviewProcess';

const ReviewerGuide = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');
    const { path } = useRouteMatch();
    const location = useLocation();
    const initialPath = `${path}/review-process`;
    const currentPath = location.pathname === path ? initialPath : location.pathname;

    return (
        <React.Fragment>
            <PageNavigation
                links={[
                    { link: initialPath, label: t('links.review-process') },
                    { link: `${path}/reviewing-policies`, label: t('links.reviewing-policies') },
                    { link: `${path}/writing-the-review`, label: t('links.writing-the-review') },
                ]}
                currentPath={currentPath}
            />
            <div className="static-page">
                <Switch>
                    <Route path={`${path}/review-process`}>
                        <ReviewProcess />
                    </Route>
                    <Route path={`${path}/reviewing-policies`}>
                        <ReviewingPolicies />
                    </Route>
                    <Route path={`${path}/writing-the-review`}>
                        <WritingReview />
                    </Route>
                    <Redirect to={initialPath} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ReviewerGuide;
