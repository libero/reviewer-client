import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery, startSubmissionMutation, deleteSubmissionMutation } from '../graphql';
import NoSubmissions from './NoSubmissions';
import { Button } from '../../ui/atoms';
import useModal from '../../ui/hooks/useModal';
import ArticleType from './ArticleType';

const Dashboard = withRouter(
    ({ history }): JSX.Element => {
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
        const [deleteSubmission] = useMutation(deleteSubmissionMutation, {
            update(cache, { data: { deleteSubmission } }) {
                const { getSubmissions } = cache.readQuery({ query: getSubmissionsQuery });
                const cloneSubmission = [...getSubmissions];
                const indexToDelete = getSubmissions.findIndex(
                    (cacheSubmission: { id: string }) => cacheSubmission.id === deleteSubmission,
                );
                cloneSubmission.splice(indexToDelete, 1);
                cache.writeQuery({
                    query: getSubmissionsQuery,
                    data: { getSubmissions: cloneSubmission },
                });
            },
        });

        const onArticleTypeConfirm = (articleType: string): void => {
            startSubmission({ variables: { articleType } }).then(data => {
                history.push(
                    `/submit/${data.data.startSubmission.id}/${data.data.startSubmission.lastStepVisited || 'author'}`,
                );
            });
        };
        const { t } = useTranslation('dashboard');
        if (isShowing) {
            return <ArticleType onCancel={toggle} onConfirm={onArticleTypeConfirm} loading={loadingStartSubmission} />;
        }
        if (!loading && data.getSubmissions.length === 0) {
            return <NoSubmissions onStartClick={toggle} />;
        } else {
            return (
                <div className="dashboard">
                    <div className="dashboard__button_container">
                        <Button id="new-submission-button" onClick={(): void => toggle()} type="primary">
                            {t('new-submission')}
                        </Button>
                    </div>
                    {loading ? (
                        'loading'
                    ) : (
                        <SubmissionList submissions={data.getSubmissions} onDelete={deleteSubmission} />
                    )}
                </div>
            );
        }
    },
);

export default Dashboard;
