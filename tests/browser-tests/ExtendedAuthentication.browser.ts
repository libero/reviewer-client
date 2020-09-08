import { DashboardPage, LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`ExtendedAuthentication`.page`${BASE_URL}`.meta('fixtureID', 'staging');

test('User can login', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    await dashboardPage.assertOnPage();
    await navigationPane.assertOnPageAuthenticated();
});

test('User can logout then login again', async () => {
    const loginPage = new LoginPage();
    const navigationPane = new NavigationPane();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();
    await navigationPane.logout();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();
});
