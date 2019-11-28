Feature('Login');

Scenario('Redirect to Dashboard on Login', (I, loginPage, dashboardPage) => {
    loginPage.onPage();
    loginPage.login();
    dashboardPage.onPage();
});
