import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Paragraph } from '../../ui/atoms';

const NotSupportedBrowser = (): JSX.Element => {
    const { t } = useTranslation('browser-not-supported');

    return (
        <div className="not-supported-browser">
            <h1 className="typography__heading typography__heading--h1">Your borwser is not supported</h1>
            <Paragraph type="reading">We recommed using one of the following browsers to submit your research</Paragraph>
            <div>images</div>
            <Link to="/" className="typography__body--link">
                Return to eLife's homepage
            </Link>
        </div>
    );
};

export default NotSupportedBrowser;
