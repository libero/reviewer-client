import { Selector, t } from 'testcafe';

export class LoginPage {
    private readonly loginButton: Selector = Selector('.button--orcid');
    private readonly cookieBanner: Selector = Selector('.cookie-banner');
    private readonly cookieBannerButton: Selector = Selector('.cookie-banner__button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.loginButton.visible).ok({ timeout: 500 });
    }

    public async isCookieBannerVisible(): Promise<boolean> {
        return this.cookieBanner.visible;
    }

    public async dismissCookieBanner(): Promise<void> {
        await t.click(this.cookieBannerButton);
        await t.expect(this.cookieBannerButton.visible).notOk();
    }

    public async login(): Promise<void> {
        await t.click(this.loginButton);
        if (this.isCookieBannerVisible) {
            this.dismissCookieBanner();
        }
    }
}
