import * as React from 'react';
import * as ReactDOM from 'react-dom';
import I18n from './src/core/utils/i18n';
import App from './src/core/components/App';

const main = async (): Promise<void> => {
    const response = await fetch('/config');
    const config = await response.json();

    CONFIG = {
        API_HOST: config.client_api_url,
        LOGIN_URL: config.client_login_url,
    };

    I18n();

    const wrapper = document.getElementById('app');
    wrapper ? ReactDOM.render(<App />, wrapper) : false;
};

main();
