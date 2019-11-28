const { I } = inject();

module.exports = {
    // insert your locators and methods here
    onPage() {
        I.amOnPage('/login');
    },

    login() {
        I.see('Welcome!');
        I.click('Login with ORCID');
    },
};
