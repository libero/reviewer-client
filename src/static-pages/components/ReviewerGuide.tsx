import React from 'react';
import { Switch, useRouteMatch, useLocation, Route, Redirect } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import SideNavigationMobile from './SideNavigationMobile';
import { useTranslation } from 'react-i18next';
import WritingReview from './WritingReview';
import ReviewingPolicies from './ReviewingPolicies';
import ReviewProcess from './ReviewProcess';

const ReviewerGuide = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');
    const { path } = useRouteMatch();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <React.Fragment>
            <SideNavigationMobile
                links={[
                    { link: `${path}/review-process`, label: t('links.review-process') },
                    { link: `${path}/reviewing-policies`, label: t('links.reviewing-policies') },
                    { link: `${path}/writing-the-review`, label: t('links.writing-the-review') },
                ]}
                currentPath={currentPath}
            />
            <div className="static-page">
                <SideNavigation
                    links={[
                        { link: `${path}/review-process`, label: t('links.review-process') },
                        { link: `${path}/reviewing-policies`, label: t('links.reviewing-policies') },
                        { link: `${path}/writing-the-review`, label: t('links.writing-the-review') },
                    ]}
                    currentPath={currentPath}
                />
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
                    <Redirect to={path + '/review-process'} />
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ReviewerGuide;
