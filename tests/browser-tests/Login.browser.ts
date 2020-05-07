import { LoginPage, DashboardPage } from '../page-objects';

fixture`Getting Started`.page`http://localhost:9000`;

test.skip('My first test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
});

test('My second test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');
});
