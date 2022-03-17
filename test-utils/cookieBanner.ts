import { ClientFunction, Selector, t } from 'testcafe';

const cookieBanner: Selector = Selector('#CybotCookiebotDialog');
const cookieBannerButton: Selector = Selector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

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

export async function dismissCookieBanner(): Promise<void> {
    if (await !hasConsentedToCookies()) {
        await t.expect(cookieBanner.exists).ok();
        await t.expect(cookieBanner.visible).ok();
        await t.expect(cookieBannerButton.exists).ok();
        await t.expect(cookieBannerButton.visible).ok();
        await t.hover(cookieBannerButton).click(cookieBannerButton);
        await t.expect(cookieBannerButton.visible).notOk();
    }
};