import { DashboardPage, LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { t, Selector } from 'testcafe';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`ExtendedAuthentication`
    .page(BASE_URL)
    .meta('fixtureID', 'staging')
    .beforeEach(beforeEach);

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
    if (process.env.ORCID_LOGIN_REQUIRED) {
        await t.expect(Selector('.wrapper.wrapper--site-header').exists).ok();
        await t.navigateTo(BASE_URL);
    }
    await loginPage.assertOnPage();
    await loginPage.login(true);
    await navigationPane.assertOnPageAuthenticated();
});
