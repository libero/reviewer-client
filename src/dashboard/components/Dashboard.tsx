import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph } from '../../ui/atoms';
import SubmissionList from './SubmissionList';
import { getSubmissionsQuery, startSubmissionMutation } from '../graphql';
import { ExecutionResult } from 'graphql';

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

        return (
            <div className="dashboard main-content--centered">
                <div className="dashboard__button_container">
                    <Button type="primary" onClick={(): Promise<ExecutionResult> => startSubmission()}>
                        {t('dashboard:new-submission')}
                    </Button>
                </div>
                {loading ? 'loading' : <SubmissionList submissions={data.getSubmissions} />}
                <Paragraph type="footer">
                    To find existing submissions or to submit a{' '}
                    <Link className="footer__link" to="/author-guide/types">
                        Research Advance
                    </Link>{' '}
                    please visit our{' '}
                    <a className="footer__link" href="https://submit.elifesciences.org">
                        full peer review and submissions system
                    </a>{' '}
                </Paragraph>
            </div>
        );
    },
);

export default Dashboard;
