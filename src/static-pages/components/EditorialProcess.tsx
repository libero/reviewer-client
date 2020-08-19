import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const EditorialProcess = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading typography__heading--h1">{t('editorial.editorial.heading')}</h1>

            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p1')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p2')} />
            </Paragraph>

            <div className="blue-box">
                <h2 className="typography__heading typography__heading--h2">
                    {t('editorial.editorial.pre-print.heading')}
                </h2>
                <Paragraph type="reading">{t('editorial.editorial.pre-print.p1')}</Paragraph>
                <Paragraph type="reading">
                    <Interweave content={t('editorial.editorial.pre-print.p2')} />
                </Paragraph>
            </div>

            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p3')} />
            </Paragraph>
            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p4')} />
            </Paragraph>

            <div className="blue-box">
                <Paragraph type="reading">
                    <Interweave content={t('editorial.editorial.p5')} />
                </Paragraph>
            </div>

            <Paragraph type="reading">
                <Interweave content={t('editorial.editorial.p6')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('editorial.initial-sub.heading')}</h2>
            <Paragraph type="reading">
                <Interweave content={t('editorial.initial-sub.p1')} />
            </Paragraph>
            <ul>
                <li>{t('editorial.initial-sub.bullet1')}</li>
                <li>{t('editorial.initial-sub.bullet2')}</li>
                <li>{t('editorial.initial-sub.bullet3')}</li>
            </ul>

            <h2 className="typography__heading typography__heading--h2">{t('editorial.full-sub.heading')}</h2>
            <Paragraph type="reading">
                <Interweave content={t('editorial.full-sub.p1')} />
            </Paragraph>

            <h2 className="typography__heading typography__heading--h2">{t('editorial.revised-sub.heading')}</h2>
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
