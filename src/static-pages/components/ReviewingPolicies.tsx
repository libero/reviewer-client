import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ReviewingPolicies = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="reviewer-guide__content">
            <h1>{t('reviewing-policies.heading')}</h1>
            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.p1')} />
            </Paragraph>

            <h2>{t('reviewing-policies.confidentiality.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.confidentiality.p1')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.confidentiality.p2')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.confidentiality.p3')} />
            </Paragraph>

            <h2>{t('reviewing-policies.anonymity.heading')}</h2>
            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.anonymity.p1')} />
            </Paragraph>

            <h2>{t('reviewing-policies.competing-interests.heading')}</h2>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.competing-interests.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('reviewing-policies.competing-interests.bullet1')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('reviewing-policies.competing-interests.bullet2')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('reviewing-policies.competing-interests.bullet3')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('reviewing-policies.competing-interests.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.competing-interests.p2')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interweave content={t('reviewing-policies.competing-interests.p3')} />
            </Paragraph>
        </div>
    );
};

export default ReviewingPolicies;
