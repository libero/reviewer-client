import { waitForReact } from 'testcafe-react-selectors';

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

fixture`Return to step`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('Return to Author Step', async () => {
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

test('Return to Files Step', async () => {
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

test('Return to Details Step', async () => {
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

test('Return to Editors Step', async () => {
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

test('Return to Disclosure Step', async () => {
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
