import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';

const WritingReview = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('writing-review.heading')}</h1>
            <Interweave content={t('writing-review.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('writing-review.evaluation.heading')}</h2>
            <Interweave content={t('writing-review.evaluation.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('writing-review.public-review.heading')}</h2>
            <Interweave content={t('writing-review.public-review.content')} />
            <h2 className="typography__heading typography__heading--h2">
                {t('writing-review.recommendations.heading')}
            </h2>
            <Interweave content={t('writing-review.recommendations.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('writing-review.examples.heading')}</h2>
            <Interweave content={t('writing-review.examples.content')} />
            <h2 className="typography__heading typography__heading--h2">
                {t('writing-review.examples-public-review.heading')}
            </h2>
            <Interweave content={t('writing-review.examples-public-review.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.summary1.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.summary1.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.public-review1.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.public-review1.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.recommendations1.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.recommendations1.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.summary2.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.summary2.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.public-review2.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.public-review2.content')} />
            <h3 className="typography__heading typography__heading--h3">
                {t('writing-review.examples-public-review.recommendations2.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.recommendations2.content')} />
        </div>
    );
};

export default WritingReview;
