import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const DataAvailibility = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('data-availibility.anchor')} className="typography__heading typography__heading--h1">
                {t('data-availibility.heading')}
            </h1>

            <h2 id={t('data-availibility.scoop.anchor')} className="typography__heading typography__heading--h2">
                {t('data-availibility.scoop.heading')}
            </h2>

            <h3 className="typography__heading typography__heading--h3">{t('data-availibility.scoop.question1')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('data-availibility.scoop.answer1')} />
            </Paragraph>
        </div>
    );
};

export default DataAvailibility;
