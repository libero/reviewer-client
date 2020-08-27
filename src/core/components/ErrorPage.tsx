import React from 'react';
import { useTranslation } from 'react-i18next';
import errorImage from '../assets/error.svg';

const formatErrorMessage = error => {
    if (error instanceof Error) {
        return error.message;
    }
    if (['string', 'number'].includes(typeof error)) {
        return error;
    }
    return '';
};

interface Props {
    error?: Error | string;
}

const ErrorPage = ({ error }: Props) => {
    const { t } = useTranslation('contact-us');
    return (
        <div>
            <img alt="Test tube experiment" src={errorImage} />
            <h1 className="typography__heading typography__heading--h1">{t('Oops')}</h1>
            <h2 className="typography__heading typography__heading--h2">{t('Something is wrong')}</h2>
            <pre>{formatErrorMessage(error)}</pre>
            <a href="/">Back to homepage</a>
        </div>
    );
};

export default ErrorPage;
