import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ReviewProcess = (): JSX.Element => {
    const { t } = useTranslation('reviewer-guide');

    return (
        <div className="reviewer-guide__content">
            <h1>{t('review-process.heading')}</h1>
            <Paragraph type="writing">
                <Interweave content={t('review-process.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('review-process.p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('review-process.p3')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('review-process.p4')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('review-process.p5')} />
            </Paragraph>

            <h2>{t('review-process.peer.heading')}</h2>
            <Paragraph type="writing">
                <Interweave content={t('review-process.peer.p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('review-process.peer.p2')} />
            </Paragraph>
            <ul>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet4')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet5')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="writing">
                        <Interweave content={t('review-process.peer.bullet6')} />
                    </Paragraph>
                </li>
            </ul>
            <Paragraph type="writing">
                <Interweave content={t('review-process.peer.p3')} />
            </Paragraph>

            <Paragraph type="writing">
                <Interweave content={t('review-process.peer.p4')} />
            </Paragraph>
        </div>
    );
};

export default ReviewProcess;
