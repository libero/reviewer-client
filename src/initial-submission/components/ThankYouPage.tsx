import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import { Link, useParams } from 'react-router-dom';
import { Submission } from '../types';
import { getSubmissionQuery, submitSubmissionMutation } from '../graphql';
import * as H from 'history';
import { useQuery } from '@apollo/react-hooks';

interface Props {
    submission: Submission;
}

interface GetSubmission {
    getSubmission: Submission;
}

const ThankYouPage = (): JSX.Element => {
    const { t } = useTranslation('thank-you-page');
    const { id } = useParams();

    const { data, loading } = useQuery<GetSubmission>(getSubmissionQuery, {
        variables: { id },
        returnPartialData: true,
    });

    if (loading) {
        return <span>loading... </span>;
    }

    const { manuscriptDetails = {} } = data.getSubmission;
    const { title = '' } = manuscriptDetails;

    return (
        <div className="thank-you-page-step">
            <h1>{t('heading')}</h1>
            <Paragraph type="writing" className="title">
                {t('p1', { title })}
            </Paragraph>

            <Paragraph type="writing">{t('p2')}</Paragraph>

            <Paragraph type="footer">
                {t('p3')}
                <Link to="/">{t('link')}</Link>
            </Paragraph>

            <div>
                <Link to="/" className="button button--primary">
                    {t('finish')}
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
