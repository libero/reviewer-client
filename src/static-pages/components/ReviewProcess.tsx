import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';

const ReviewProcess = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('review-process.heading')}</h1>
            <Interweave content={t('review-process.content')} />
            <h2 className="typography__heading typography__heading--h2">
                {t('review-process.review-consultation.heading')}
            </h2>
            <Interweave content={t('review-process.review-consultation.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('review-process.bias.heading')}</h2>
            <Interweave content={t('review-process.bias.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('review-process.peer.heading')}</h2>
            <Interweave content={t('review-process.peer.content')} />
        </div>
    );
};

export default ReviewProcess;
