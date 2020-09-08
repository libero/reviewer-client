import { t } from 'testcafe';
import { DashboardPage, NavigationHelper, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Dashboard`.page`${BASE_URL}`.meta('fixtureID', 'staging');


test('User can delete a submission', async () => {
    const navigationHelper = new NavigationHelper();
    const navigationPane = new NavigationPane();
    const id = await navigationHelper.navigateToAuthorPage();
    await navigationPane.navigateToDashboard();
    const dashboardPage = new DashboardPage();
    const submissions = await dashboardPage.getSubmissions();
    await t.expect(submissions.some(sub => sub.id === id)).ok();
    await dashboardPage.deleteSubmission(id);
    const submissionsAfterDelete = await dashboardPage.getSubmissions();
    await t.expect(submissionsAfterDelete.some(sub => sub.id === id)).notOk();
});
