import { Selector, t } from 'testcafe';

export class DashboardPage {
    private readonly withSubmissions: Selector = Selector('.dashboard');
    private readonly noSubmissions: Selector = Selector('.no-submissions');
    private readonly newSubmissionButton: Selector = Selector('#new-submission-button');
    private readonly continueButton: Selector = Selector('.article-type__buttons > .button--primary');
    private readonly menuLink: Selector = Selector('.menu__link--active');
    private readonly submissionLinks: Selector = Selector('.submission-entry__link');
    private readonly newSubmissionContainer: Selector = Selector('.article-type');
    private readonly articleTypeSelect: Selector = Selector('.select-field__control');
    private readonly articleTypeValue: Selector = Selector('.select-field__single-value');
    private readonly articleTypeMenu: Selector = Selector('.select-field__menu');
    private readonly articleTypeOptions: Selector = Selector('.select-field__option');
    private readonly dashboardTabs: Selector = Selector('.dashboard__tabs');

    public async assertOnPage(): Promise<void> {
        const dashboard = await this.withSubmissions.visible;
        const noSubmissions = await this.noSubmissions.visible;

        await t.expect(dashboard !== noSubmissions).ok();
    }

    public async newSubmission(articleType: string): Promise<void> {
        await t.click(this.newSubmissionButton);
        await t.click(this.articleTypeSelect);
        await t.click(this.articleTypeOptions.withText(articleType));
        await t.expect(this.articleTypeValue.textContent).eql(articleType);
    }
}
