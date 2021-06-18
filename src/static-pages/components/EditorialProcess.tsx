import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const EditorialProcess = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('editorial.editorial.anchor')} className="typography__heading typography__heading--h1">
                {t('editorial.editorial.heading')}
            </h1>
            <Interweave content={t('editorial.editorial.content')} />

            <h2 id={t('editorial.editorial.pre-print.anchor')} className="typography__heading typography__heading--h2">
                {t('editorial.editorial.pre-print.heading')}
            </h2>
            <Interweave content={t('editorial.editorial.pre-print.content')} />
            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p1')} />
            </Paragraph>

            <h2 id={t('editorial.initial-sub.anchor')} className="typography__heading typography__heading--h2">
                {t('editorial.initial-sub.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('editorial.initial-sub.p1')} />
            </Paragraph>
            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('editorial.initial-sub.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('editorial.initial-sub.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('editorial.initial-sub.bullet3')} />
                    </Paragraph>
                </li>
            </ul>

            <h2 id={t('editorial.full-sub.anchor')} className="typography__heading typography__heading--h2">
                {t('editorial.full-sub.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('editorial.full-sub.p1')} />
            </Paragraph>

            <h2 id={t('editorial.revised-sub.anchor')} className="typography__heading typography__heading--h2">
                {t('editorial.revised-sub.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('editorial.revised-sub.p1')} />
            </Paragraph>

            <div className="blue-box">
                <Paragraph type="reading">
                    <Interweave content={t('editorial.closing-bluebox')} />
                </Paragraph>
            </div>
        </div>
    );
};

export default EditorialProcess;
