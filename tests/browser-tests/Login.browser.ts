import { LoginPage } from '../page-objects';

fixture`Getting Started`.page`http://localhost:9000`;

test('My first test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
});
