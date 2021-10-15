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
                id={t('revised-submission.source-manuscript.tables.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.tables.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.tables.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.tables.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.tables.p3')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.figures-figure-supplements.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.figures-figure-supplements.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p4')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p5')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p6')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p7')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.figures-figure-supplements.p8')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.appendix-files.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.appendix-files.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.appendix-files.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.appendix-files.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.appendix-files.p3')} />
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
                id={t('revised-submission.source-manuscript.rich-media-files.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.rich-media-files.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.rich-media-files.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.rich-media-files.p2')} />
            </Paragraph>

            <h3
                id={t('revised-submission.source-manuscript.source-data-files.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('revised-submission.source-manuscript.source-data-files.heading')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.source-data-files.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.source-data-files.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.source-data-files.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.source-data-files.p4')} />
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
            <Paragraph type="reading">
                <Interweave content={t('revised-submission.source-manuscript.digest.p2')} />
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
