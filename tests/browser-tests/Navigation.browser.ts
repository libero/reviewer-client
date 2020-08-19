import { LoginPage, NavigationPane } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { waitForReact } from 'testcafe-react-selectors';

fixture`Navigation`.page`${BASE_URL}`;

// .beforeEach(async () => {
//     await waitForReact();
// });

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