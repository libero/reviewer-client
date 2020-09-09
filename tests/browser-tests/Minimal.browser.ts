import { LoginPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Minimal`.page`${BASE_URL}`;

test('landing page is rendered', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
});
