import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import RequiredInfoTable from './RequiredInfoTable';

const InitialSubmission = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('initial-submission.heading')}</h1>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.p1')} />
            </Paragraph>

            <div className="blue-box">
                <h2 className="typography__heading typography__heading--h2">
                    {t('initial-submission.pre-print.heading')}
                </h2>
                <Paragraph type="reading">{t('initial-submission.pre-print.p1')}</Paragraph>
                <Paragraph type="reading">
                    <Interweave content={t('initial-submission.pre-print.p2')} />
                </Paragraph>
            </div>

            <h2 id="single-manuscript">{t('initial-submission.manuscript.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.manuscript.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.manuscript.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.manuscript.p3')} />
            </Paragraph>

            <ol>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.one')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.two')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.three')} />
                    </Paragraph>
                </li>

                <li>
                    <Interweave content={t('initial-submission.manuscript.components.four.p1')} />

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p2')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p3')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p4')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p5')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p6')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.four.p7')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.five')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.six')} />
                    </Paragraph>
                </li>

                <li>
                    <Interweave content={t('initial-submission.manuscript.components.seven.p1')} />

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.seven.p2')} />
                    </Paragraph>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.manuscript.components.seven.p3')} />
                    </Paragraph>
                </li>
            </ol>

            <RequiredInfoTable />

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.manuscript.p4')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('initial-submission.figures.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.figures.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.figures.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.figures.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.figures.p4')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.figures.p5')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('initial-submission.meta.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.meta.p1')} />
            </Paragraph>

            <ol>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.one')} />
                    </Paragraph>
                </li>

                <li>
                    <Interweave content={t('initial-submission.meta.data.two.p1')} />
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.two.p2')} />
                    </Paragraph>

                    <ul>
                        <li>
                            <Interweave content={t('initial-submission.meta.data.two.bullet1')} />
                        </li>
                        <li>
                            <Interweave content={t('initial-submission.meta.data.two.bullet2')} />
                        </li>
                        <li>
                            <Interweave content={t('initial-submission.meta.data.two.bullet3')} />
                        </li>
                        <li>
                            <Interweave content={t('initial-submission.meta.data.two.bullet4')} />
                        </li>
                    </ul>

                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.two.p3')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.three')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.four')} />
                    </Paragraph>
                </li>
                <li>
                    <Interweave content={t('initial-submission.meta.data.five.p1')} />
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.five.p2')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.six')} />
                    </Paragraph>
                </li>

                <li id="diversity">
                    <Paragraph type="reading">
                        <Interweave content={t('initial-submission.meta.data.seven')} />
                    </Paragraph>
                </li>
            </ol>

            <Paragraph type="reading">
                <Interweave content={t('initial-submission.meta.p2')} />
            </Paragraph>
        </div>
    );
};

export default InitialSubmission;
