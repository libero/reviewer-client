import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const ReviewingPolicies = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('reviewing-policies.anchor')} className="typography__heading typography__heading--h1">
                {t('reviewing-policies.heading')}
            </h1>
            <Interweave content={t('reviewing-policies.content')} />

            <h2
                id={t('reviewing-policies.confidentiality.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('reviewing-policies.confidentiality.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.confidentiality.content')} />

            <h2 id={t('reviewing-policies.anonymity.anchor')} className="typography__heading typography__heading--h2">
                {t('reviewing-policies.anonymity.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.anonymity.content')} />

            <h2
                id={t('reviewing-policies.competing-interests.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('reviewing-policies.competing-interests.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.competing-interests.content')} />

            <h2 id={t('reviewing-policies.misconduct.anchor')} className="typography__heading typography__heading--h2">
                {t('reviewing-policies.misconduct.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.misconduct.content')} />

            <h2 id={t('reviewing-policies.research.anchor')} className="typography__heading typography__heading--h2">
                {t('reviewing-policies.research.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.research.content')} />
        </div>
    );
};

export default ReviewingPolicies;
