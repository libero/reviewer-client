import { CookieBanner, DashboardPage, LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`Authentication`.page(`${BASE_URL}`).beforeEach(beforeEach);

test('User can login', async () => {
    const cookieBanner = new CookieBanner();
    await cookieBanner.assertOnPage();
    await cookieBanner.acceptCookies();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    const navigationPane = new NavigationPane();
    await dashboardPage.assertOnPage();
    await navigationPane.assertOnPageAuthenticated();
});
