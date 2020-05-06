import { NightwatchBrowser } from 'nightwatch';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';

export = {
    'Test Login': (browser: NightwatchBrowser): void => {
        const login = new LoginPage(browser);
        login.open();
        login.login();

        const dashboard = new DashboardPage(browser);
        dashboard.onPage();
        browser.assert.notEqual( dashboard.pageState(), 'Unknown');
        browser.end();
    },
};
