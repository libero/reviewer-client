import {
    NavigationHelper,
    NavigationPane,
    AuthorDetailsPage,
    DashboardPage,
    FilesPage,
    DetailsPage,
    EditorPage,
    DisclosurePage,
} from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { t } from 'testcafe';
import { sleep } from '../../test-utils/sleep';

fixture`Persistence`.page(BASE_URL).beforeEach(async () => {
    await sleep(10000);
});

test('Return to Author Step from Dashboard', async () => {
    const navigationHelper = new NavigationHelper();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    const authorDetailsPage = new AuthorDetailsPage();
    const submissionId = await navigationHelper.navigateToAuthorPage();
    await authorDetailsPage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await navigationPane.navigateToDashboard();
    await dashboardPage.assertOnPage();
    await dashboardPage.openSubmission(submissionId);
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.assertPopulatedValues();
});

test('Return to Files Step from Dashboard', async () => {
    const navigationHelper = new NavigationHelper();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    const filesPage = new FilesPage();
    const submissionId = await navigationHelper.navigateToFilesPage();
    await filesPage.populateMinimalFields();
    await navigationPane.navigateToDashboard();
    await dashboardPage.assertOnPage();
    await dashboardPage.openSubmission(submissionId);
    await filesPage.assertOnPage();
    await filesPage.assertPopulatedValues();
});

test('Return to Details Step from Dashboard', async () => {
    const navigationHelper = new NavigationHelper();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    const detailsPage = new DetailsPage();
    const submissionId = await navigationHelper.navigateToDetailsPage();
    await detailsPage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await navigationPane.navigateToDashboard();
    await dashboardPage.assertOnPage();
    await dashboardPage.openSubmission(submissionId);
    await detailsPage.assertOnPage();
    await detailsPage.assertPopulatedValues();
});

test('Return to Editors Step from Dashboard', async () => {
    const navigationHelper = new NavigationHelper();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    const editorsPage = new EditorPage();
    const submissionId = await navigationHelper.navigateToEditorsPage();
    await editorsPage.populateMinimalFields();
    await navigationPane.navigateToDashboard();
    await dashboardPage.assertOnPage();
    await dashboardPage.openSubmission(submissionId);
    await editorsPage.assertOnPage();
    await editorsPage.assertPopulatedValues();
});

test('Return to Disclosure Step from Dashboard', async () => {
    const navigationHelper = new NavigationHelper();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    const disclosurePage = new DisclosurePage();
    const submissionId = await navigationHelper.navigateToDisclosurePage();
    await disclosurePage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await navigationPane.navigateToDashboard();
    await dashboardPage.assertOnPage();
    await dashboardPage.openSubmission(submissionId);
    await disclosurePage.assertOnPage();
    await disclosurePage.assertPopulatedValues();
});

test('Author Step persists values on refresh', async () => {
    const navigationHelper = new NavigationHelper();
    const authorDetailsPage = new AuthorDetailsPage();
    await navigationHelper.navigateToAuthorPage();
    await authorDetailsPage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await t.eval(() => location.reload(true));
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.assertPopulatedValues();
});

test('Files Step persists values on refresh', async () => {
    const navigationHelper = new NavigationHelper();
    const filesPage = new FilesPage();
    await navigationHelper.navigateToFilesPage();
    await filesPage.populateMinimalFields();
    await t.eval(() => location.reload(true));
    await filesPage.assertOnPage();
    await filesPage.assertPopulatedValues();
});

test('Details Step persists values on refresh', async () => {
    const navigationHelper = new NavigationHelper();
    const detailsPage = new DetailsPage();
    await navigationHelper.navigateToDetailsPage();
    await detailsPage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await t.eval(() => location.reload(true));
    await detailsPage.assertOnPage();
    await detailsPage.assertPopulatedValues();
});

test('Editors Step persists values on refresh', async () => {
    const navigationHelper = new NavigationHelper();
    const editorsPage = new EditorPage();
    await navigationHelper.navigateToEditorsPage();
    await editorsPage.populateMinimalFields();
    await t.eval(() => location.reload(true));
    await editorsPage.assertOnPage();
    await editorsPage.assertPopulatedValues();
});

test('Disclosure Step persists values on refresh', async () => {
    const navigationHelper = new NavigationHelper();
    const disclosurePage = new DisclosurePage();
    await navigationHelper.navigateToDisclosurePage();
    await disclosurePage.populateMinimalFields();
    // allow autosave to catch up
    await t.wait(2000);
    await t.eval(() => location.reload(true));
    await disclosurePage.assertOnPage();
    await disclosurePage.assertPopulatedValues();
});
