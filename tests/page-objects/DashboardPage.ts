import { Selector, t } from 'testcafe';

export enum DashboardState {
    WithSubmissions = 'WithSubmissions',
    NoSubmission = 'NoSubmission',
    Unknown = 'Unknown',
}

export interface DashboardSubmission {
    id: string;
    title: string;
    dateDiff: string;
    timestamp: string;
}

const MAX_ASSERT_ON_PAGE_RETRIES = 5;

export class DashboardPage {
    private readonly withSubmissions = Selector('.dashboard');
    private readonly noSubmissions = Selector('.no-submissions');
    private readonly newSubmissionButton = Selector('#new-submission-button');
    private readonly continueButton = Selector('.article-type__buttons > .button--primary');
    private readonly submissionEntry = Selector('.submission-entry');
    private readonly newSubmissionContainer: Selector = Selector('.article-type');
    private readonly articleTypeSelect: Selector = Selector('.select-field__control');
    private readonly articleTypeValue: Selector = Selector('.select-field__single-value');
    private readonly articleTypeOptions: Selector = Selector('.select-field__option');
    private readonly confirmDeleteButton = Selector('.button--danger');

    public async assertOnPage(retries = 0): Promise<void> {
        const dashboard = await this.withSubmissions.visible;
        const noSubmissions = await this.noSubmissions.visible;

        if (!dashboard && !noSubmissions && retries < MAX_ASSERT_ON_PAGE_RETRIES) {
            await this.assertOnPage(retries + 1);
        } else {
            await t.expect(dashboard !== noSubmissions).ok({ timeout: 1000 });
        }
    }

    public async getDashboardState(): Promise<DashboardState> {
        const dashboard = await this.withSubmissions.visible;
        const noSubmissions = await this.noSubmissions.visible;
        if (dashboard) {
            return DashboardState.WithSubmissions;
        } else if (noSubmissions) {
            return DashboardState.NoSubmission;
        } else {
            return DashboardState.Unknown;
        }
    }

    public async getSubmissionStatusText(id: string): Promise<string> {
        const submissionSelector = this.submissionEntry.withAttribute('data-id', id);
        return submissionSelector.find('.submission-entry__link_text').textContent;
    }

    public async assertSubmissionStatus(id: string, status: 'continue' | 'submitted'): Promise<void> {
        const statusText = await this.getSubmissionStatusText(id);
        await t.expect(statusText.toLowerCase()).contains(status);
    }

    public async openSubmission(id: string): Promise<void> {
        const submissionSelector = this.submissionEntry.withAttribute('data-id', id);
        await t.click(submissionSelector.find('.submission-entry__link'));
    }

    public async getSubmissions(): Promise<DashboardSubmission[]> {
        const state = await this.getDashboardState();
        switch (state) {
            case DashboardState.WithSubmissions:
                const submissions = await this.submissionEntry;
                const subCount = await submissions.count;
                const dashboardSubmissions: DashboardSubmission[] = [];
                for (let i = 0; i < subCount; i++) {
                    const sub = submissions.nth(i);
                    const id = await sub.getAttribute('data-id');
                    const title = await sub.find('.submission-entry__title').textContent;
                    const dateDiff = await sub.find('.submission-entry__dates').child(0).textContent;
                    const timestamp = await sub.find('.submission-entry__dates').child(1).textContent;
                    dashboardSubmissions.push({ id, title, dateDiff, timestamp });
                }
                return dashboardSubmissions;
            case DashboardState.NoSubmission:
            case DashboardState.Unknown:
                return [];
        }
    }

    public async newSubmission(articleType: string): Promise<void> {
        await t.click(this.newSubmissionButton);
        await t.expect(this.newSubmissionContainer.exists).ok();
        await t.click(this.articleTypeSelect);
        await t.click(this.articleTypeOptions.withText(articleType));
        await t.expect(this.articleTypeValue.textContent).eql(articleType);
        await t.click(this.continueButton);
    }

    public async deleteSubmission(id: string): Promise<void> {
        if ((await this.getDashboardState()) !== DashboardState.WithSubmissions) {
            console.warn('no submissions to delete');
            return;
        }
        const submissionSelector = await this.submissionEntry.withAttribute('data-id', id);
        await t.click(submissionSelector.find('.submission-entry__icon'));
        await t.click(this.confirmDeleteButton);
    }
}
