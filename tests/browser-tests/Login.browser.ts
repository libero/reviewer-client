import { DashboardPage, FilesPage, LoginPage, AuthorDetailsPage } from '../page-objects';
// import { DashboardState } from '../page-objects/DashboardPage';

fixture`Getting Started`.page`http://localhost:9000`;

test('My first test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
});

test('Happy path', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();

    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');

    const authorDetailsPage = new AuthorDetailsPage();
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.populateForm();
    await authorDetailsPage.next();

    const filesPage = new FilesPage();
    await filesPage.assertOnPage();
    await filesPage.populateForm();
    await filesPage.next();
});
