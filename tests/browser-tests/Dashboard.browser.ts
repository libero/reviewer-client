import { t } from 'testcafe';
import { DashboardPage, NavigationHelper, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`Dashboard`
    .page(BASE_URL)
    .meta('fixtureID', 'staging')
    .beforeEach(beforeEach);

test('User can delete a submission', async () => {
    const navigationHelper = new NavigationHelper();
    const navigationPane = new NavigationPane();
    const id = await navigationHelper.navigateToAuthorPage();
    await navigationPane.navigateToDashboard();
    const dashboardPage = new DashboardPage();
    const dashboardItem = await dashboardPage.getSubmissionItem(id);
    await t.expect(dashboardItem.exists).ok();
    await dashboardPage.deleteSubmission(id);
    await t.expect(dashboardItem.exists).notOk();
});
