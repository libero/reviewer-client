import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';

const Survey: React.FC<RouteComponentProps> = () => {
    const { t } = useTranslation('survey');
    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{t('title')}</h2>
            <p>dfdfdffdsfdsfdsfdsfddfdsfdsfdsfsdfsdfdsfdsfdsffsdfds</p>
        </div>
    );
};

export default Survey;
