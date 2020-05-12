import { DashboardPage, LoginPage, AuthorDetailsPage } from '../page-objects';
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
    await authorDetailsPage.next();
    // await t.navigateTo('http://localhost:9000');
    // console.log(await dashboardPage.getState());
    // await t.expect(await dashboardPage.getState()).eql(DashboardState.WithSubmissions);
    // const submissions = await dashboardPage.getSubmissions();
    // console.log(submissions.length);
    // await t.expect(submissions.length).eql(7);
    // console.log(JSON.stringify(submissions));
});
