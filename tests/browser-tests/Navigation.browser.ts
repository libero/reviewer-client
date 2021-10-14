import { CookieBanner, LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { sleep } from '../../test-utils/sleep';

fixture`Navigation`.page(BASE_URL).beforeEach(async () => {
    await sleep(10000);
});

test('assert nav bar', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const cookieBanner = new CookieBanner();
    await cookieBanner.assertOnPage();
    await cookieBanner.acceptCookies();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();
    await navigationPane.assertNavItems();
    await navigationPane.assertProfileDropDown();
    await navigationPane.navigateToAuthorGuide();
    await navigationPane.navigateToReviewerGuide();
    await navigationPane.navigateToContactUs();
    await navigationPane.navigateToDashboard();
    await navigationPane.assertUserName();
    await navigationPane.logout();
});
