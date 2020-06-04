import React from 'react';
import Interwave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const RevisedSubmission = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('revised-submission.heading')}</h1>

            <h2>{t('revised-submission.decision-response.heading')}</h2>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.decision-response.p1')} />
            </Paragraph>

            <h2>{t('revised-submission.source-manuscript.heading')}</h2>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.p1')} />
            </Paragraph>

            <h3>{t('revised-submission.source-manuscript.article-text.heading')}</h3>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.article-text.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.article-text.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.article-text.p3')} />
            </Paragraph>

            <h3>{t('revised-submission.source-manuscript.key-resources.heading')}</h3>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.key-resources.p1')} />
            </Paragraph>

            <h3>{t('revised-submission.source-manuscript.figures.heading')}</h3>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.figures.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.figures.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.figures.p3')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.figures.p4')} />
            </Paragraph>

            <h3>{t('revised-submission.source-manuscript.figest.heading')}</h3>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.digest.p1')} />
            </Paragraph>

            <h3>{t('revised-submission.source-manuscript.striking.heading')}</h3>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.striking.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('revised-submission.source-manuscript.striking.p2')} />
            </Paragraph>
        </div>
    );
};

export default RevisedSubmission;
