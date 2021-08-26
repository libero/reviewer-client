import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

export class LoginPage {
    private readonly loginButton: Selector = Selector('.button--orcid');
    private readonly cookieBanner: Selector = Selector('#CybotCookiebotDialog');
    private readonly cookieBannerButton: Selector = Selector('#CybotCookiebotDialogBodyLevelButtonAccept');
    private readonly orcidPage: Selector = Selector('.orcid-wizard');
    private readonly orcidIDInput: Selector = Selector('[formcontrolname=username]');
    private readonly orcidPasswordInput: Selector = Selector('[formcontrolname=password]');
    private readonly orcidLoginButton: Selector = Selector('.sign-in-button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.loginButton.exists).ok();
        await t.expect(this.loginButton.visible).ok();
    }

    private async assertNotOnPage(): Promise<void> {
        await t.expect(this.loginButton.exists).notOk({ timeout: 15000 });
        await t.expect(this.loginButton.visible).notOk({ timeout: 15000 });
    }

    private async assertCookieBannerVisible(): Promise<void> {
        // CookieBot banner can take a while to load and display
        await t.expect(this.cookieBanner.exists).ok({ timeout: 15000 });
        await t.expect(this.loginButton.visible).ok({ timeout: 15000 });
        await t.expect(this.cookieBannerButton.exists).ok({ timeout: 15000 });
        await t.expect(this.cookieBannerButton.visible).ok({ timeout: 15000 });
    }

    private async dismissCookieBanner(): Promise<void> {
        await clickSelector('.cookie-banner__button');
        await t.expect(this.cookieBannerButton.visible).notOk();
    }

    public async login(orcidLoginOptional = false): Promise<void> {
        await this.assertCookieBannerVisible();
        await this.dismissCookieBanner();
        await clickSelector('.button--orcid');
        if (process.env.ORCID_LOGIN_REQUIRED && process.env.ORCID_LOGIN_NAME && process.env.ORCID_LOGIN_PASSWORD) {
            const orcidPageVisible = await this.orcidPage.exists;
            if (orcidLoginOptional && !orcidPageVisible) return;
            await this.assertOnOrcidPage();
            await this.enterORCIDId(process.env.ORCID_LOGIN_NAME);
            await this.enterORCIDPassword(process.env.ORCID_LOGIN_PASSWORD);
            await this.orcidLogin();
            await this.assertNotOnOrcidPage();
        }
        await this.assertNotOnPage();
    }

    public async assertOnOrcidPage(): Promise<void> {
        await t.expect(this.orcidPage.exists).ok();
    }

    public async assertNotOnOrcidPage(): Promise<void> {
        // Long timeout here as we wait for ORCID to process request.
        await t.expect(this.orcidPage.exists).notOk({ timeout: 15000 });
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
