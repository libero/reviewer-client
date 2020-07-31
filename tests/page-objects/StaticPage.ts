import { Selector, t } from 'testcafe';
import { AuthorGuide, ReviewerGuide, ContactUs } from './StaticPages';

export class StaticPage {
    private readonly pageWrapper: Selector = Selector('.static-page');
    private readonly sidebarNav: Selector = Selector('.side-bar-nav');
    private readonly link: Selector = this.sidebarNav.find('a');
    private readonly title: Selector = Selector('.static-page__content h1');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.pageWrapper.visible).ok();
    }

    public async assertOnStaticPage(pageTitle: string): Promise<void> {
        await t.expect(this.title.textContent).eql(pageTitle);
    }

    public async assertAuthorGuideLinks(): Promise<void> {
        const authorKeys = Object.keys(AuthorGuide);
        for (let i = 0; i < authorKeys.length; i++) {
            const subPage = AuthorGuide[authorKeys[i]];
            await this.assertOnPage();
            await this.clickLink(subPage.linkText);
            await this.assertOnStaticPage(subPage.title);
        }
    }

    public async assertReviewerGuideLinks(): Promise<void> {
        const reviewerKeys = Object.keys(ReviewerGuide);
        for (let i = 0; i < reviewerKeys.length; i++) {
            const subPage = ReviewerGuide[reviewerKeys[i]];
            await this.assertOnPage();
            await this.clickLink(subPage.linkText);
            await this.assertOnStaticPage(subPage.title);
        }
    }

    public async assertContactUsLinks(): Promise<void> {
        const contactKeys = Object.keys(ContactUs);
        for (let i = 0; i < contactKeys.length; i++) {
            const subPage = ContactUs[contactKeys[i]];
            await this.assertOnPage();
            await this.clickLink(subPage.linkText);
            await this.assertOnStaticPage(subPage.title);
        }
    }

    public async getNavLinks(): Promise<string[]> {
        const links = this.sidebarNav.find('a');
        const linksText = [];
        const linksCount = await links.count;
        for (let i = 0; i < linksCount; i++) {
            linksText.push(await links.nth(i).textContent);
        }
        return linksText;
    }

    public async clickLink(linkText: string): Promise<void> {
        await t.click(this.link.withText(linkText));
    }
}
