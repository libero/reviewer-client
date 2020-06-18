import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import { Link } from 'react-router-dom';
import { Submission } from '../types';

interface Props {
    submission: Submission;
}

const ThankYouPage = ({ submission }: Props): JSX.Element => {
    const { t } = useTranslation('thank-you-page');

    const { manuscriptDetails = {} } = submission;
    const { title = '' } = manuscriptDetails;

    return (
        <div className="thank-you-page-step">
            <h1>{t('heading')}</h1>
            <Paragraph type="writing">{t('p1', { title })}</Paragraph>

            <Paragraph type="writing">{t('p2')}</Paragraph>

            <Paragraph type="footer">
                {t('p3')}
                <Link to="/">{t('link')}</Link>
            </Paragraph>

            <div>
                <Link to="/" className="button button--primary">
                    {t('finish')}
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
