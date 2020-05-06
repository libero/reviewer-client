import { NightwatchBrowser } from 'nightwatch';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';

export = {
    'Happy Path': (browser: NightwatchBrowser): void => {
        const login = new LoginPage(browser);
        login.open();
        login.login();

        const dashboard = new DashboardPage(browser);

        dashboard.onPage();
        browser.assert.equal(dashboard.getAllSubmissions().length, 0);
        dashboard.newSubmission('Feature Article');

        // navigate to dashboard
        // browser.assert.equal(dashboard.getAllSubmissions().length, 1);

        browser.end();
    },
};

// const dashboard = browser.page.DashboardPage();
// await dashboard.onPage();
// const appPage = browser.page.AppPage();
// await appPage.testUserName('Tamlyn Rhodes (author)');
// await dashboard.createNewSubmission('Research Article');
