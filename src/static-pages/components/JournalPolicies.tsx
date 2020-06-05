import React from 'react';
import Interwave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const JournalPolicies = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('journal-policies.heading')}</h1>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.p3')} />
            </Paragraph>
        </div>
    );
};

export default JournalPolicies;
