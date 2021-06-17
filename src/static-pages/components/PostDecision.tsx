import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const PostDecision = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('post.anchor')} className="typography__heading typography__heading--h1">
                {t('post.heading')}
            </h1>

            <h2 id={t('post.public-reviews.anchor')} className="typography__heading typography__heading--h2">
                {t('post.public-reviews.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('post.public-reviews.p1')} />
            </Paragraph>

            <h2 id={t('post.acceptance.anchor')} className="typography__heading typography__heading--h2">
                {t('post.acceptance.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('post.acceptance.p1')} />
            </Paragraph>
            <h3 id={t('post.acceptance.executable.anchor')} className="typography__heading typography__heading--h3">
                {t('post.acceptance.executable.heading')}
            </h3>
            <Interweave content={t('post.acceptance.executable.content')} />

            <h3 id={t('post.acceptance.protocols.anchor')} className="typography__heading typography__heading--h3">
                {t('post.acceptance.protocols.heading')}
            </h3>

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

            <h3 id={t('post.publication-manuscript.anchor')} className="typography__heading typography__heading--h3">
                {t('post.publication-manuscript.heading')}
            </h3>

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

            <h3 id={t('post.final-version.anchor')} className="typography__heading typography__heading--h3">
                {t('post.final-version.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('post.final-version.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.final-version.p2')} />
            </Paragraph>

            <h2 id={t('post.corrections.anchor')} className="typography__heading typography__heading--h2">
                {t('post.corrections.heading')}
            </h2>

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

            <h2 id={t('post.rejections.anchor')} className="typography__heading typography__heading--h2">
                {t('post.rejections.heading')}
            </h2>

            <h3 id={t('post.rejections.peers.anchor')} className="typography__heading typography__heading--h3">
                {t('post.rejections.peers.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.peers.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.peers.p2')} />
            </Paragraph>

            <h3 id={t('post.rejections.appeals.anchor')} className="typography__heading typography__heading--h3">
                {t('post.rejections.appeals.heading')}
            </h3>

            <Paragraph type="reading">
                <Interweave content={t('post.rejections.appeals.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('post.rejections.appeals.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('post.rejections.appeals.p3')} />
            </Paragraph>
        </div>
    );
};

export default PostDecision;
