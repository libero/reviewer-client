import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const WritingReview = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('writing-review.anchor')} className="typography__heading typography__heading--h1">
                {t('writing-review.heading')}
            </h1>
            <Interweave content={t('writing-review.content')} />

            <h2
                id={t('writing-review.examples-public-review.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('writing-review.examples-public-review.heading')}
            </h2>
            <Interweave content={t('writing-review.examples-public-review.content')} />

            <h3
                id={t('writing-review.examples-public-review.public-review1.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('writing-review.examples-public-review.public-review1.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.public-review1.content')} />

            <h3
                id={t('writing-review.examples-public-review.public-review2.anchor')}
                className="typography__heading typography__heading--h3"
            >
                {t('writing-review.examples-public-review.public-review2.heading')}
            </h3>
            <Interweave content={t('writing-review.examples-public-review.public-review2.content')} />
        </div>
    );
};

export default WritingReview;
