import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const Fees = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('fees.heading')}</h1>

            <Paragraph type="reading">
                <Interweave content={t('fees.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.p4')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.p5')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.bullet3')} />
                    </Paragraph>
                </li>
            </ul>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question1.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question1.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question2.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question2.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question3.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question3.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question4.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question4.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question5.heading')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('fees.question5.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.question5.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.question5.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.question5.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('fees.question5.bullet4')} />
                    </Paragraph>
                </li>
            </ul>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question6.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question6.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.question6.p2')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question7.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question7.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question8.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question8.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.question9.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.question9.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.question9.p2')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('fees.waiver.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.p4')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.p5')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('fees.waiver.refund.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('fees.waiver.refund.p1')} />
            </Paragraph>
        </div>
    );
};

export default Fees;
