import { Selector, t } from 'testcafe';

export class LoginPage {
    private readonly loginButton: Selector = Selector('.button--orcid');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.loginButton.visible).ok();
    }

    public async login(): Promise<void> {
        await t.click(this.loginButton);
    }
}
