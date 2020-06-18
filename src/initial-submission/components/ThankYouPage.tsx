import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
}

const ThankYouPage = ({ title }: Props): JSX.Element => {
    const { t } = useTranslation('thank-you-page');

    return (
        <div className="thank-you-page-step">
            <h1>{t('heading')}</h1>
            <Paragraph type="writing">{t('heading').replace('@title', title)}</Paragraph>

            <Paragraph type="writing">{t('p1')}</Paragraph>

            <Paragraph type="writing">
                {t('p2')}
                <Link to="/">{t('link')}</Link>
            </Paragraph>
        </div>
    );
};

export default ThankYouPage;
