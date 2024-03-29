import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const FullSubmission = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('full-submission.anchor')} className="typography__heading typography__heading--h1">
                {t('full-submission.heading')}
            </h1>

            <Paragraph type="reading">
                <Interweave content={t('full-submission.p1')} />
            </Paragraph>

            <h2 id={t('full-submission.files.anchor')} className="typography__heading typography__heading--h2">
                {t('full-submission.files.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('full-submission.files.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('full-submission.files.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('full-submission.files.p3')} />
            </Paragraph>

            <ol>
                <li>
                    <span id={t('full-submission.files.reporting.anchor')} className="bullet-heading">
                        {t('full-submission.files.reporting.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.reporting.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.reporting.p2')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.figures.anchor')} className="bullet-heading">
                        {t('full-submission.files.figures.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p2')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p3')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p4')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p5')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.figures.p6')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.data.anchor')} className="bullet-heading">
                        {t('full-submission.files.data.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.data.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.data.p2')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.data.p3')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.file.anchor')} className="bullet-heading">
                        {t('full-submission.files.file.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.file.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.file.p2')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.standards.anchor')} className="bullet-heading">
                        {t('full-submission.files.standards.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.standards.p1')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.supplementary-files.anchor')} className="bullet-heading">
                        {t('full-submission.files.supplementary-files.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.supplementary-files.p1')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.files.related.anchor')} className="bullet-heading">
                        {t('full-submission.files.related.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.files.related.p1')} />
                    </Paragraph>
                </li>
            </ol>

            <h2 id={t('full-submission.meta.anchor')} className="typography__heading typography__heading--h2">
                {t('full-submission.meta.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('full-submission.meta.p1')} />
            </Paragraph>

            <ol>
                <li>
                    <span id={t('full-submission.meta.author.anchor')} className="bullet-heading">
                        {t('full-submission.meta.author.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.author.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.author.p2')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.author.p3')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.author.p4')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.meta.datasets.anchor')} className="bullet-heading">
                        {t('full-submission.meta.datasets.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.datasets.p1')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.datasets.p2')} />
                    </Paragraph>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.datasets.p3')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.meta.ethics.anchor')} className="bullet-heading">
                        {t('full-submission.meta.ethics.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.ethics.p1')} />
                    </Paragraph>
                </li>

                <li>
                    <span id={t('full-submission.meta.editors.anchor')} className="bullet-heading">
                        {t('full-submission.meta.editors.heading')}
                    </span>
                    <Paragraph type="reading">
                        <Interweave content={t('full-submission.meta.editors.p1')} />
                    </Paragraph>
                </li>
            </ol>

            <Paragraph type="reading">
                <Interweave content={t('full-submission.p2')} />
            </Paragraph>
        </div>
    );
};

export default FullSubmission;
