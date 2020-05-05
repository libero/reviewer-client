import { NightwatchBrowser } from 'nightwatch';

export class LoginPage {
    private readonly loginButton: string = '.button--orcid';
    private browser: NightwatchBrowser;

    constructor(browser: NightwatchBrowser) {
        this.browser = browser;
    }

    public open(): LoginPage {
        this.browser.url('http://localhost:9000');
        return this;
    }

    public login(): void {
        this.browser.waitForElementVisible(this.loginButton).click(this.loginButton);
    }
}
