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
        dashboard.newSubmission('Feature Article');
        // const dashboard = browser.page.DashboardPage();
        // await dashboard.onPage();
        // const appPage = browser.page.AppPage();
        // await appPage.testUserName('Tamlyn Rhodes (author)');
        // await dashboard.createNewSubmission('Research Article');
        browser.end();
    },
};
