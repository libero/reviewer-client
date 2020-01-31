import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph } from '../../ui/atoms';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery, startSubmissionMutation } from '../graphql';
import { ExecutionResult } from 'graphql';
import NoSubmissions from './NoSubmissions';

const Dashboard = withRouter(
    (): JSX.Element => {
        const { loading, data } = useQuery(getSubmissionsQuery);
        const [startSubmission] = useMutation(startSubmissionMutation, {
            update(cache, { data: { startSubmission } }) {
                const { getSubmissions } = cache.readQuery({ query: getSubmissionsQuery });
                cache.writeQuery({
                    query: getSubmissionsQuery,
                    data: { getSubmissions: getSubmissions.concat([startSubmission]) },
                });
            },
        });
        const { t } = useTranslation();

        if (!loading && data.getSubmissions.length === 0) {
            return <NoSubmissions startSubmission={startSubmission} />;
        } else {
            return (
                <div className="dashboard">
                    <div className="dashboard__button_container">
                        <Button type="primary" onClick={(): Promise<ExecutionResult> => startSubmission()}>
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
