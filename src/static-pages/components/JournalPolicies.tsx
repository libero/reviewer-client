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

            <h2>{t('journal-policies.misconduct.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.misconduct.p1')} />
            </Paragraph>

            <h2>{t('journal-policies.experiments.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.experiments.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.experiments.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.experiments.p3')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.experiments.p4')} />
            </Paragraph>

            <h2>{t('journal-policies.authorship.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.authorship.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.authorship.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interwave content={t('journal-policies.authorship.p3')} />
            </Paragraph>

            <h2>{t('journal-policies.cell-lines.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.cell-lines.p1')} />
            </Paragraph>

            <h2>{t('journal-policies.competing-interests.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.competing-interests.p1')} />
            </Paragraph>

            <h2>{t('journal-policies.compliance.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.compliance.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.compliance.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.compliance.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.compliance.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.compliance.bullet4')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.compliance.bullet5')} />
                    </Paragraph>
                </li>
            </ul>

            <h2>{t('journal-policies.copywrite.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.copywrite.p1')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.competing-interests.p1')} />
            </Paragraph>

            <h2>{t('journal-policies.open-data.heading')}</h2>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.p1')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.p2')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.p3')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <h3>{t('journal-policies.open-data.data.heading')}</h3>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.data.p1')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.data.p2')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.data.p3')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.data.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.data.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.data.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interwave content={t('journal-policies.open-data.data.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.data.p4')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interwave content={t('journal-policies.open-data.data.p5')} />
            </Paragraph>
        </div>
    );
};

export default JournalPolicies;
