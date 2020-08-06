import { LoginPage, NavigationPane, StaticPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { waitForReact } from 'testcafe-react-selectors';

fixture`Static Pages`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('static pages', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.navigateToAuthorGuide();
    const staticPage = new StaticPage();
    await staticPage.assertAuthorGuideLinks();
    await navigationPane.navigateToReviewerGuide();
    await staticPage.assertReviewerGuideLinks();
    await navigationPane.navigateToContactUs();
    await staticPage.assertContactUsLinks();
});
