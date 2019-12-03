import { Selector, t } from 'testcafe';

class LoginPage {
    private readonly loginButton: Selector;
    constructor() {
        this.loginButton = Selector('.button--orcid');
    }

    async login(): Promise<void> {
        await t.click(this.loginButton);
    }
}

export default new LoginPage();
