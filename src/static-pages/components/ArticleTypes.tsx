import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const ArticleTypes = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('article-types.anchor')} className="typography__heading typography__heading--h1">
                {t('article-types.heading')}
            </h1>
            <div className="blue-box">
                <Paragraph type="reading">
                    <Interweave content={t('article-types.closing-bluebox')} />
                </Paragraph>
            </div>

            <Paragraph type="reading">
                <Interweave content={t('article-types.p1')} />
            </Paragraph>

            <h2 id={t('article-types.insights.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.insights.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.insights.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.insights.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.insights.p3')} />
            </Paragraph>

            <h2
                id={t('article-types.research-articles.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('article-types.research-articles.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.research-articles.p1')} />
            </Paragraph>

            <h2 id={t('article-types.short-reports.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.short-reports.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.short-reports.p1')} />
            </Paragraph>

            <h2 id={t('article-types.tools.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.tools.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.tools.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.tools.p2')} />
            </Paragraph>

            <h2 id={t('article-types.advances.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.advances.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.advances.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.advances.p2')} />
            </Paragraph>
            <Paragraph type="reading">{t('article-types.advances.p3')}</Paragraph>

            <h2 id={t('article-types.review-articles.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.review-articles.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.review-articles.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.review-articles.p2')} />
            </Paragraph>
            <ol>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.review-articles.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.review-articles.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.review-articles.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.review-articles.bullet4')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.review-articles.bullet5')} />
                    </Paragraph>
                </li>
            </ol>
            <Paragraph type="reading">
                <Interweave content={t('article-types.review-articles.p3')} />
            </Paragraph>

            <h2
                id={t('article-types.sci-correspondence.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('article-types.sci-correspondence.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p4')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p5')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p6')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p7')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.sci-correspondence.p8')} />
            </Paragraph>
            <div className="blue-box">
                <Paragraph type="reading">
                    <Interweave content={t('article-types.sci-correspondence.p9')} />
                </Paragraph>
            </div>

            <h2 id={t('article-types.special-issues.anchor')} className="typography__heading typography__heading--h2">
                {t('article-types.special-issues.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('article-types.special-issues.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.special-issues.p2')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('article-types.special-issues.p3')} />
            </Paragraph>
            <Paragraph type="reading">{t('article-types.special-issues.p4')}</Paragraph>
            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.special-issues.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.special-issues.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.special-issues.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.special-issues.bullet4')} />
                    </Paragraph>
                </li>
            </ul>
            <Paragraph type="reading">{t('article-types.special-issues.p5')}</Paragraph>
            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('article-types.special-issues.bullet5')} />
                    </Paragraph>
                </li>
            </ul>
        </div>
    );
};

export default ArticleTypes;
