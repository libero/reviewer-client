import { Selector, t } from 'testcafe';

const cookieBanner: Selector = Selector('#CybotCookiebotDialog');
const cookieBannerButton: Selector = Selector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

export async function dismissCookieBanner(): Promise<void> {
    if (await cookieBanner.exists) {
        await t.expect(cookieBanner.exists).ok();
        await t.expect(cookieBanner.visible).ok();
        await t.expect(cookieBannerButton.exists).ok();
        await t.expect(cookieBannerButton.visible).ok();
        await t.hover(cookieBannerButton).click(cookieBannerButton);
        await t.expect(cookieBannerButton.visible).notOk();
    }
};