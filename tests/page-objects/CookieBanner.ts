import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

export class CookieBanner {
    private readonly cookieBanner: Selector = Selector('#CybotCookiebotDialog');
    private readonly cookieBannerButton: Selector = Selector('#CybotCookiebotDialogBodyLevelButtonAccept');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.cookieBanner.exists).ok();
        await t.expect(this.cookieBanner.visible).ok();
        await t.expect(this.cookieBannerButton.exists).ok();
        await t.expect(this.cookieBannerButton.visible).ok();
    }

    public async acceptCookies(): Promise<void> {
        await clickSelector('#CybotCookiebotDialogBodyLevelButtonAccept');
        await t.expect(this.cookieBannerButton.visible).notOk();
    }
}
