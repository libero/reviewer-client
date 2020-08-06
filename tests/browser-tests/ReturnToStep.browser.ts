import { waitForReact } from 'testcafe-react-selectors';

import { NavigationHelper, NavigationPane, AuthorDetailsPage, DashboardPage } from '../page-objects';
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
