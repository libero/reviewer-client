import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const WritingReview = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('writing-review.heading')}</h1>
            <h2 className="typography__heading typography__heading--h2">{t('writing-review.selection.heading')}</h2>
            <Paragraph type="reading">
                <Interweave content={t('writing-review.selection.p1')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('writing-review.review.heading')}</h2>
            <Paragraph type="reading">
                <Interweave content={t('writing-review.review.p1')} />
            </Paragraph>

            <ol>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('writing-review.review.bullet1')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('writing-review.review.bullet2')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('writing-review.review.bullet3')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('writing-review.review.bullet4')} />
                    </Paragraph>
                </li>

                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('writing-review.review.bullet5')} />
                    </Paragraph>
                </li>
            </ol>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.review.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.review.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.review.p4')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('writing-review.submit.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.submit.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.submit.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('writing-review.submit.p3')} />
            </Paragraph>
        </div>
    );
};

export default WritingReview;
