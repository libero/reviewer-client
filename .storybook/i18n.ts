import i18n, { InitOptions } from 'i18next';
import merge from 'lodash/merge';
import { initReactI18next } from 'react-i18next';
import ArticleTypes from '../src/core/locales/en/article-types.json';
import Login from '../src/core/locales/en/login.json';
import UI from '../src/core/locales/en/ui.json';
import Dashboard from '../src/core/locales/en/dashboard.json';
import NoSubmission from '../src/core/locales/en/no-submission.json';
import Orcid from '../src/core/locales/en/orcid-details.json';
import Common from '../src/core/locales/en/common.json';
import Translation from '../src/core/locales/en/translation.json';

export default function(options = {}): void {
    let i18nOptions: InitOptions = {
        lng: 'en',
        load: 'currentOnly',
        keySeparator: '.',
        ns: ['article-types', 'common', 'dashboard', 'login', 'no-submission', 'orcid-details', 'ui'],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== 'production',
        react: {
            wait: true,
        },
        resources: {
            en: {
                'article-types': ArticleTypes,
                common: Common,
                dashboard: Dashboard,
                login: Login,
                'no-submission': NoSubmission,
                'orcid-details': Orcid,
                translation: Translation,
                ui: UI,
            },
        },
        interpolation: {
            escapeValue: false,
        },
    };

    merge(i18nOptions, options);

    i18n.use(initReactI18next).init(i18nOptions);
}
