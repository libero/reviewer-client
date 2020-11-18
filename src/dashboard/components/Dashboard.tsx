import React, { useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery, startSubmissionMutation, deleteSubmissionMutation, saveArticleType } from '../graphql';
import NoSubmissions from './NoSubmissions';
import { Button, Paragraph } from '../../ui/atoms';
import useModal from '../../ui/hooks/useModal';
import ArticleType from './ArticleType';
import Interweave from 'interweave';
import { Spinner } from '../../ui/atoms';
import { CLEAR_ERROR } from '../../initial-submission/graphql';

const Dashboard = withRouter(
    ({ history }): JSX.Element => {
        const query = new URLSearchParams(useLocation().search);
        const { isShowing, toggle } = useModal();
        const [noArticleTypeId, setNoArticleTypeId] = useState<string>();
        const { loading, data } = useQuery(getSubmissionsQuery);
        const [clearError] = useMutation(CLEAR_ERROR);
        const alreadySubmitted = query.get('alreadySubmitted');
        const [saveArticleTypeMutation] = useMutation(saveArticleType);
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
            if (noArticleTypeId) {
                saveArticleTypeMutation({ variables: { id: noArticleTypeId, articleType } }).then(data => {
                    history.push(data.data.saveArticleType.lastStepVisited);
                });
            } else {
                startSubmission({ variables: { articleType } }).then(data => {
                    const { id, lastStepVisited } = data.data.startSubmission;
                    if (['short-report', 'research-article'].includes(articleType)) {
                        history.push(`/submit/${id}/info`);
                    } else {
                        history.push(lastStepVisited);
                    }
                });
            }
        };
        const { t } = useTranslation('dashboard');

        useEffect(() => {
            if (alreadySubmitted) {
                clearError();
            }
            // remove all query parameters
            history.replace(window.location.pathname);
        }, [alreadySubmitted]);

        if (isShowing) {
            return <ArticleType onCancel={toggle} onConfirm={onArticleTypeConfirm} loading={loadingStartSubmission} />;
        }
        if (!loading && (typeof data === 'undefined' || (data && data.getSubmissions.length === 0))) {
            return <NoSubmissions onStartClick={toggle} />;
        } else {
            return (
                <div className="dashboard">
                    <div className="dashboard__button_container">
                        <Button id="new-submission-button" onClick={(): void => toggle()} type="primary">
                            {t('new-submission')}
                        </Button>
                    </div>
                    {loading && (
                        <div className="spinner-center">
                            <Spinner />
                        </div>
                    )}
                    {data && data.getSubmissions && (
                        <SubmissionList
                            submissions={data.getSubmissions}
                            onDelete={deleteSubmission}
                            toggle={toggle}
                            setNoArticleTypeId={setNoArticleTypeId}
                        />
                    )}
                    <Paragraph className="dashboard__footer" type="footer">
                        <Interweave content={t('footer')} />
                    </Paragraph>
                </div>
            );
        }
    },
);

export default Dashboard;
