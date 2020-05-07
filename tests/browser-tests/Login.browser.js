'use strict';
const { LoginPage } = require('../page-objects/LoginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');
module.exports = {
    'Test Login': async browser => {
        const login = new LoginPage(browser);
        login.open();
        await login.login();
        const dashboard = new DashboardPage(browser);
        dashboard.onPage();
        browser.end();
    },
};
