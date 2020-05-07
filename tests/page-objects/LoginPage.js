'use strict';

class LoginPage {
    constructor(browser) {
        this.loginButton = '.button--orcid';
        this.browser = browser;
    }
    open() {
        this.browser.url('http://localhost:9000');
        return this;
    }
    async login() {
        await this.browser.waitForElementVisible(this.loginButton);
        await this.browser.click(this.loginButton);
    }
}
module.exports = { LoginPage };
