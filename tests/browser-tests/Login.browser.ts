import { t } from 'testcafe';
import { DashboardPage, FilesPage, FileStatus, LoginPage } from '../page-objects';
// import { DashboardState } from '../page-objects/DashboardPage';

fixture`Getting Started`.page`http://localhost:9000`;

test.skip('My first test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
});

test.skip('Happy path', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');
    // await t.navigateTo('http://localhost:9000');
    // console.log(await dashboardPage.getState());
    // await t.expect(await dashboardPage.getState()).eql(DashboardState.WithSubmissions);
    // const submissions = await dashboardPage.getSubmissions();
    // console.log(submissions.length);
    // await t.expect(submissions.length).eql(7);
    // console.log(JSON.stringify(submissions));
});

test('TEMP - Files Step test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');
    await t.navigateTo('http://localhost:9000');
    const submissions = await dashboardPage.getSubmissions();
    await t.navigateTo(`/submit/${submissions[0].id}/files`);
    const filesPage = new FilesPage();
    await filesPage.assertOnPage();
    await filesPage.fillAndProceed();
    await filesPage.uploadSupportingFiles(['../test-data/dummy-manuscript.docx', '../test-data/dummy-manuscript.docx']);
    const filesStatus = await filesPage.getSupportingFilesStatus();
    console.log(filesStatus);
    await t.expect(filesStatus).eql([
        {
            status: 0,
            filename: 'dummy-manuscript.docx',
        },
        {
            status: 0,
            filename: 'dummy-manuscript.docx',
        },
    ]);
    await filesPage.deleteSupportingFile(1);
    const newFilesStatus = await filesPage.getSupportingFilesStatus();
    await t.expect(newFilesStatus).eql([
        {
            status: 0,
            filename: 'dummy-manuscript.docx',
        },
    ]);
});
