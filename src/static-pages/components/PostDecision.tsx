import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const PostDecision = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('post.heading')}</h1>

            <h2 className="typography__heading typography__heading--h2">{t('post.acceptance.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('post.acceptance.p1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('post.acceptance.protocols.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('post.acceptance.protocols.p1')} />
            </Paragraph>

            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('post.acceptance.protocols.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('post.acceptance.protocols.bullet2')} />
                    </Paragraph>
                </li>
            </ul>

            <h3 className="typography__heading typography__heading--h3">{t('post.publication-manuscript.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('post.publication-manuscript.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.publication-manuscript.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.publication-manuscript.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.publication-manuscript.p4')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('post.final-version.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('post.final-version.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.final-version.p2')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('post.corrections.heading')}</h2>

            <Paragraph type="reading">
                <Interweave content={t('post.corrections.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.corrections.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.corrections.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.corrections.p4')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('post.rejections.heading')}</h2>

            <h3 className="typography__heading typography__heading--h3">{t('post.rejections.peers.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.peers.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.peers.p2')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('post.rejections.appeals.heading')}</h3>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.appeals.p1')} />
            </Paragraph>
        </div>
    );
};

export default PostDecision;
