import { DashboardPage, LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Authentication`.page`${BASE_URL}`.meta('fixtureID', 'umbrella');

test('User can login', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    await dashboardPage.assertOnPage();
    await navigationPane.assertOnPageAuthenticated();
});