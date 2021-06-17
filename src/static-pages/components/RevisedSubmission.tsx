import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const RevisedSubmission = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('revised-submission.anchor')} className="typography__heading typography__heading--h1">
                {t('revised-submission.heading')}
            </h1>

            <h2
                id={t('revised-submission.decision-response.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.decision-response.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.decision-response.p1')} />
            </Paragraph>

            <h2
                id={t('revised-submission.source-manuscript.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.source-manuscript.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.p1')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.article-text.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.article-text.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.article-text.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.article-text.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.article-text.p3')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.key-resources.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.key-resources.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.key-resources.p1')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.figures.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.figures.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures.p4')} />
            </Paragraph>

            <h2
                id={t('revised-submission.source-manuscript.impact-statement.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.source-manuscript.impact-statement.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.impact-statement.p1')} />
            </Paragraph>

            <h2
                id={t('revised-submission.source-manuscript.funding-information.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.source-manuscript.funding-information.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.funding-information.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.funding-information.p2')} />
            </Paragraph>

            <h2
                id={t('revised-submission.source-manuscript.digest.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.source-manuscript.digest.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.digest.p1')} />
            </Paragraph>

            <h2
                id={t('revised-submission.source-manuscript.striking.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('revised-submission.source-manuscript.striking.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.striking.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.striking.p2')} />
            </Paragraph>
        </div>
    );
};

export default RevisedSubmission;
