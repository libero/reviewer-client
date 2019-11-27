Feature('Login');

Scenario('test something', (I, loginPage, dashboardPage) => {
    loginPage.onPage();
    loginPage.login();
    dashboardPage.onPage();
});
