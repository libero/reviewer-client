import { LoginPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`Minimal`.page(BASE_URL).beforeEach(beforeEach);

test('landing page is rendered', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
});
