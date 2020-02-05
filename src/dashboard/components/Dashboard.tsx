import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery, startSubmissionMutation } from '../graphql';
import NoSubmissions from './NoSubmissions';
import { Button } from '../../ui/atoms';
import useModal from '../../ui/hooks/useModal';
import ArticleType from './ArticleType';

const Dashboard = withRouter(
    (): JSX.Element => {
        const { isShowing, toggle } = useModal();
        const { loading, data } = useQuery(getSubmissionsQuery);
        const [startSubmission, { loading: loadingStartSubmission }] = useMutation(startSubmissionMutation, {
            update(cache, { data: { startSubmission } }) {
                const { getSubmissions } = cache.readQuery({ query: getSubmissionsQuery });
                cache.writeQuery({
                    query: getSubmissionsQuery,
                    data: { getSubmissions: getSubmissions.concat([startSubmission]) },
                });
            },
        });

        const onArticleTypeConfirm = (articleType: string): void => {
            startSubmission({ variables: { articleType } }).then(() => {
                // this should be replaced with redirect to wizard eventually
                toggle();
            });
        };
        const { t } = useTranslation();
        if (isShowing) {
            return <ArticleType onCancel={toggle} onConfirm={onArticleTypeConfirm} loading={loadingStartSubmission} />;
        }
        if (!loading && data.getSubmissions.length === 0) {
            return <NoSubmissions onStartClick={toggle} />;
        } else {
            return (
                <div className="dashboard">
                    <div className="dashboard__button_container">
                        <Button onClick={(): void => toggle()} type="primary">
                            {t('dashboard:new-submission')}
                        </Button>
                    </div>
                    {loading ? 'loading' : <SubmissionList submissions={data.getSubmissions} />}
                </div>
            );
        }
    },
);

export default Dashboard;
