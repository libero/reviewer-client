import { DashboardPage, FilesPage, LoginPage, AuthorDetailsPage, DetailsPage, NavigationPane } from '../page-objects';
// import { DashboardState } from '../page-objects/DashboardPage';

fixture`Getting Started`.page`http://localhost:9000`;

test('My first test', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
});

test('Happy path', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();

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

    const detailsPage = new DetailsPage();
    await detailsPage.assertOnPage();
    await detailsPage.populateForm();
    await detailsPage.next();
});
