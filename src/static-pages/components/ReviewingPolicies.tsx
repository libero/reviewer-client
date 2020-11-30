import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';

const ReviewingPolicies = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('reviewing-policies.heading')}</h1>
            <Interweave content={t('reviewing-policies.content')} />
            <h2 className="typography__heading typography__heading--h2">
                {t('reviewing-policies.confidentiality.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.confidentiality.content')} />

            <h2 className="typography__heading typography__heading--h2">{t('reviewing-policies.anonymity.heading')}</h2>
            <Interweave content={t('reviewing-policies.anonymity.content')} />

            <h2 className="typography__heading typography__heading--h2">
                {t('reviewing-policies.competing-interests.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.competing-interests.content')} />
            <h2 className="typography__heading typography__heading--h2">
                {t('reviewing-policies.misconduct.heading')}
            </h2>
            <Interweave content={t('reviewing-policies.misconduct.content')} />
            <Interweave content={t('reviewing-policies.competing-interests.content')} />
            <h2 className="typography__heading typography__heading--h2">{t('reviewing-policies.research.heading')}</h2>
            <Interweave content={t('reviewing-policies.research.content')} />
        </div>
    );
};

export default ReviewingPolicies;
