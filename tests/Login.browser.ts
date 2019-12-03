import { NightwatchBrowser } from 'nightwatch';

export = {
    'Test Login': async function(browser: NightwatchBrowser): Promise<void> {
        const login = browser.page.LoginPage();
        await login.navigate();
        await login.login();
        const dashboard = browser.page.DashboardPage();
        await dashboard.onPage();
    },
};
