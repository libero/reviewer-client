import { LoginPage, DashboardPage } from './page-objects';

fixture`Login`.page('http://localhost:9000');

test('Log in', async (): Promise<void> => {
    await LoginPage.login();
    await DashboardPage.onPage();
});
