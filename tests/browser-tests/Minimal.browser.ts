import { LoginPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { sleep } from '../../test-utils/sleep';

fixture`Minimal`.page(BASE_URL).beforeEach(async () => {
    await sleep(10000);
});

test('landing page is rendered', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
});
