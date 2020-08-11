import * as React from 'react';
import * as ReactDOM from 'react-dom';
import I18n from './core/utils/i18n';
import App from './core/components/App';

const main = async (): Promise<void> => {
    I18n();
};

main();
ReactDOM.render(<App />, document.getElementById('app'));
