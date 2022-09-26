import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const JournalPolicies = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('journal-policies.anchor')} className="typography__heading typography__heading--h1">
                {t('journal-policies.heading')}
            </h1>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.p3')} />
            </Paragraph>

            <h2 id={t('journal-policies.misconduct.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.misconduct.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.misconduct.p1')} />
            </Paragraph>

            <h2 id={t('journal-policies.experiments.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.experiments.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.experiments.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.experiments.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.experiments.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.experiments.p4')} />
            </Paragraph>

            <h2 id={t('journal-policies.authorship.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.authorship.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.authorship.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.authorship.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.authorship.p3')} />
            </Paragraph>

            <h2
                id={t('journal-policies.author-identification.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-policies.author-identification.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.author-identification.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.author-identification.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('journal-policies.author-identification.p3')} />
            </Paragraph>

            <h2 id={t('journal-policies.cell-lines.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.cell-lines.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.cell-lines.p1')} />
            </Paragraph>

            <h2
                id={t('journal-policies.competing-interests.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-policies.competing-interests.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.competing-interests.p1')} />
            </Paragraph>

            <h2 id={t('journal-policies.compliance.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.compliance.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.compliance.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.compliance.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.compliance.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.compliance.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.compliance.bullet4')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.compliance.bullet5')} />
                    </Paragraph>
                </li>
            </ul>

            <h2 id={t('journal-policies.copyright.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.copyright.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.copyright.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.copyright.p2')} />
            </Paragraph>

            <h2 id={t('journal-policies.open-data.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.open-data.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.p3')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.open-data.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.open-data.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.open-data.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.open-data.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <h3
                id={t('journal-policies.open-data.data.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.open-data.data.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.data.p1')} />
            </Paragraph>

            <h3
                id={t('journal-policies.open-data.software.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.open-data.software.heading')}
            </h3>
            <Interweave content={t('journal-policies.open-data.software.content')} />

            <h3
                id={t('journal-policies.open-data.research.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.open-data.research.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.research.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.research.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.research.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.research.p4')} />
            </Paragraph>

            <h3
                id={t('journal-policies.open-data.accession-numbers.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.open-data.accession-numbers.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.accession-numbers.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.open-data.accession-numbers.p2')} />
            </Paragraph>

            <h2 id={t('journal-policies.dual-use.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.dual-use.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.dual-use.p1')} />
            </Paragraph>

            <h2 id={t('journal-policies.integrity.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.integrity.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.integrity.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.integrity.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.integrity.p3')} />
            </Paragraph>

            <h2
                id={t('journal-policies.image-acquisition.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-policies.image-acquisition.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.image-acquisition.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.image-acquisition.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.image-acquisition.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.image-acquisition.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.image-acquisition.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.image-acquisition.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.image-acquisition.p4')} />
            </Paragraph>

            <h2 id={t('journal-policies.licensing.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.licensing.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.licensing.p1')} />
            </Paragraph>

            <h2 id={t('journal-policies.media-policy.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.media-policy.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.p1')} />
            </Paragraph>

            <h3
                id={t('journal-policies.media-policy.prior-work.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.media-policy.prior-work.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.prior-work.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.prior-work.p2')} />
            </Paragraph>

            <h3
                id={t('journal-policies.media-policy.embargo.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.media-policy.embargo.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.embargo.p1')} />
            </Paragraph>

            <h3
                id={t('journal-policies.media-policy.accessible.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('journal-policies.media-policy.accessible.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.accessible.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.media-policy.accessible.p2')} />
            </Paragraph>

            <h2 id={t('journal-policies.name-change.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.name-change.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.name-change.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.name-change.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.name-change.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.name-change.p4')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.name-change.p5')} />
            </Paragraph>

            <h2 id={t('journal-policies.nomenclature.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.nomenclature.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.nomenclature.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.nomenclature.p2')} />
            </Paragraph>

            <h2 id={t('journal-policies.replication.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.replication.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.replication.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.replication.p2')} />
            </Paragraph>

            <h2
                id={t('journal-policies.trial-registration.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-policies.trial-registration.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.trial-registration.p1')} />
            </Paragraph>

            <h2
                id={t('journal-policies.reporting-standards.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-policies.reporting-standards.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p4')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.reporting-standards.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.reporting-standards.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.reporting-standards.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.reporting-standards.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p5')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('journal-policies.reporting-standards.p6')} />
            </Paragraph>

            <div className="blue-box">
                <Paragraph type="reading">
                    <Interweave content={t('journal-policies.reporting-standards.p7')} />
                </Paragraph>
            </div>

            <h2 id={t('journal-policies.myanmar.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-policies.myanmar.heading')}
            </h2>

            <div className="reading">
                <Paragraph type="reading">
                    <Interweave content={t('journal-policies.myanmar.p1')} />
                </Paragraph>
            </div>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.myanmar.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.myanmar.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('journal-policies.myanmar.bullet3')} />
                    </Paragraph>
                </li>
            </ul>
        </div>
    );
};

export default JournalPolicies;
