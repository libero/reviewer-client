
Feature('Login');

Scenario('test something', (I) => {
  I.amOnPage('/login');
  I.see('Welcome!');
  I.click('Login with ORCID');
});
