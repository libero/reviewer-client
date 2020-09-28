import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

export class LoginPage {
    private readonly loginButton: Selector = Selector('.button--orcid');
    private readonly cookieBanner: Selector = Selector('.cookie-banner');
    private readonly cookieBannerButton: Selector = Selector('.cookie-banner__button');
    private readonly orcidPage: Selector = Selector('.orcid-wizard');
    private readonly orcidIDInput: Selector = Selector('[formcontrolname=username]');
    private readonly orcidPasswordInput: Selector = Selector('[formcontrolname=password]');
    private readonly orcidLoginButton: Selector = Selector('.sign-in-button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.loginButton.exists).ok();
        await t.expect(this.loginButton.visible).ok();
    }

    public async isCookieBannerVisible(): Promise<boolean> {
        return this.cookieBanner.visible;
    }

    public async dismissCookieBanner(): Promise<void> {
        await clickSelector('.cookie-banner__button');
        await t.expect(this.cookieBannerButton.visible).notOk();
    }

    public async login(orcidLoginOptional = false): Promise<void> {
        await clickSelector('.button--orcid');
        if (await this.isCookieBannerVisible()) {
            await this.dismissCookieBanner();
        }
        await t.expect(this.loginButton.exists).notOk();
        if (process.env.ORCID_LOGIN_REQUIRED && process.env.ORCID_LOGIN_NAME && process.env.ORCID_LOGIN_PASSWORD) {
            const orcidPageVisible = await this.orcidPage.exists;
            if (orcidLoginOptional && !orcidPageVisible) return;
            await this.assertOnOrcidPage();
            await this.enterORCIDId(process.env.ORCID_LOGIN_NAME);
            await this.enterORCIDPassword(process.env.ORCID_LOGIN_PASSWORD);
            await this.orcidLogin();
        }
    }

    public async assertOnOrcidPage(): Promise<void> {
        await t.expect(this.orcidPage.textContent).eql('Sign in with your ORCID account');
    }

    public async enterORCIDId(orcidId: string): Promise<void> {
        await t.typeText(this.orcidIDInput, orcidId);
    }

    public async enterORCIDPassword(password: string): Promise<void> {
        await t.typeText(this.orcidPasswordInput, password);
    }

    public async orcidLogin(): Promise<void> {
        await t.click(this.orcidLoginButton);
    }
}
