import { ClientFunction, Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

const getCookies = ClientFunction(() => {
    return document.cookie;
});

async function hasConsentedToCookies(): Promise<boolean> {
    let retVal = false;
    const cookies = await getCookies();
    if (cookies.length > 0) {
        retVal = cookies.split(';').find(cookie => cookie.trim().startsWith('CookieConsent=')) ? true : false;
    }
    return retVal;
}

export class CookieBanner {
    private readonly cookieBanner: Selector = Selector('#CybotCookiebotDialog');
    private readonly cookieBannerButton: Selector = Selector('#CybotCookiebotDialogBodyLevelButtonAccept');

    public async assertOnPage(): Promise<void> {
        if (await !hasConsentedToCookies()) {
            await t.expect(this.cookieBanner.exists).ok();
            await t.expect(this.cookieBanner.visible).ok();
            await t.expect(this.cookieBannerButton.exists).ok();
            await t.expect(this.cookieBannerButton.visible).ok();
        }
    }

    public async acceptCookies(): Promise<void> {
        if (await !hasConsentedToCookies()) {
            await clickSelector('#CybotCookiebotDialogBodyLevelButtonAccept');
            await t.expect(this.cookieBannerButton.visible).notOk();
        }
    }
}
