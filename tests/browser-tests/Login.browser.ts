import { NightwatchBrowser } from 'nightwatch';
import { LoginPage } from '../page-objects/LoginPage';

export = {
    'Test Login': (browser: NightwatchBrowser): void => {
        const login = new LoginPage(browser);
        login.open();
        login.login();
        // const dashboard = browser.page.DashboardPage();
        // await dashboard.onPage();
        // const appPage = browser.page.AppPage();
        // await appPage.testUserName('Tamlyn Rhodes (author)');
        // await dashboard.createNewSubmission('Research Article');
        browser.end();
    },
};
