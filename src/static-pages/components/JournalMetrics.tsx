import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import ChartEmbed from './ChartEmbed';

const JournalMetrics = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide__content">
            <h1>{t('metrics.heading')}</h1>

            <Paragraph type="writing">
                <Interweave content={t('metrics.p1')} />
            </Paragraph>

            <h2>{t('metrics.no-of-submissions.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('metrics.no-of-submissions.p1')} />
            </Paragraph>
            <ChartEmbed
                height={358}
                src="https://datastudio.google.com/embed/reporting/1SrhoP4-CMFcXOCrtb2SGaYiGXg77e3o4/page/d5wu?hl=en"
                width={668}
            />

            <h2>{t('metrics.no-of-pubs.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('metrics.no-of-pubs.p1')} />
            </Paragraph>

            <ChartEmbed
                height={358}
                src="https://datastudio.google.com/embed/reporting/1SrhoP4-CMFcXOCrtb2SGaYiGXg77e3o4/page/VAxu?hl=en"
                width={668}
            />

            <h2>{t('metrics.time-before-peer.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('metrics.time-before-peer.p1')} />
            </Paragraph>

            <ChartEmbed
                height={358}
                src="https://datastudio.google.com/embed/reporting/1SrhoP4-CMFcXOCrtb2SGaYiGXg77e3o4/page/zRau?hl=en"
                width={668}
            />

            <h2>{t('metrics.time-after-peer.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('metrics.time-after-peer.p1')} />
            </Paragraph>

            <ChartEmbed
                height={358}
                src="https://datastudio.google.com/embed/reporting/1SrhoP4-CMFcXOCrtb2SGaYiGXg77e3o4/page/Bewu?hl=en"
                width={668}
            />

            <h2>{t('metrics.subs-to-publication.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('metrics.subs-to-publication.p1')} />
            </Paragraph>

            <ChartEmbed
                height={358}
                src="https://datastudio.google.com/embed/reporting/1SrhoP4-CMFcXOCrtb2SGaYiGXg77e3o4/page/7ewu?hl=en"
                width={668}
            />
        </div>
    );
};

export default JournalMetrics;
