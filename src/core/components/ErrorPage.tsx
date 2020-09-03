import React from 'react';
import { useTranslation } from 'react-i18next';
import errorImage from '../assets/error.svg';

const formatErrorMessage = (error: string | number | Error): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (['string', 'number'].includes(typeof error)) {
        return error.toString();
    }
    return '';
};

interface Props {
    error?: Error | string | number;
}

const ErrorPage = (props: Props): JSX.Element => {
    const { t } = useTranslation('error-page');
    const { error = `${t('404')}` } = props;
    return (
        <div className="error-page">
            <img className="error-page__image" alt="Test tube experiment" src={errorImage} />
            <h1 className="typography__heading typography__heading--h1">{t('oops')}</h1>
            <h2 className="typography__heading typography__heading--h2">{t('went-wrong')}</h2>
            <pre>{formatErrorMessage(error)}</pre>
            <a href="/">{t('back')}</a>
        </div>
    );
};

export default ErrorPage;
