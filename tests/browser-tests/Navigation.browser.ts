import { LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Navigation`.page`${BASE_URL}`;

test('assert nav bar', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
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