import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

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

export type ArticleType =
    | 'Research Article'
    | 'Short Report'
    | 'Tools and Resources'
    | 'Scientific Correspondence'
    | 'Feature Article';

export class DashboardPage {
    private readonly withSubmissions = Selector('.dashboard');
    private readonly noSubmissions = Selector('.no-submissions');
    private readonly newSubmissionButton = '#new-submission-button';
    private readonly continueButton = '.article-type__buttons > .button--primary';
    private readonly infoContinueButton = Selector('.infoStep__buttons > .button--primary');
    private readonly submissionEntry = Selector('.submission-entry');
    private readonly newSubmissionContainer: Selector = Selector('.article-type');
    private readonly articleTypeSelect: Selector = Selector('.select-field__control');
    private readonly articleTypeValue: Selector = Selector('.select-field__single-value');
    private readonly articleTypeOptions: Selector = Selector('.select-field__option');
    private readonly confirmDeleteButton = '.button--danger';

    public async assertOnPage(retries = 0): Promise<void> {
        await t.expect(Selector('.submission-wizard .spinner-center .spinner').exists).notOk();
        const dashboard = await this.withSubmissions.exists;
        const noSubmissions = await this.noSubmissions.exists;

        if (!dashboard && !noSubmissions && retries < MAX_ASSERT_ON_PAGE_RETRIES) {
            await this.assertOnPage(retries + 1);
        } else {
            if (dashboard) {
                await t.expect(this.noSubmissions.exists).notOk();
                await t.expect(this.withSubmissions.exists).ok();
            } else {
                await t.expect(this.withSubmissions.exists).notOk();
                await t.expect(this.noSubmissions.exists).ok();
            }
        }
    }

    public async getDashboardState(): Promise<DashboardState> {
        const dashboard = await this.withSubmissions.exists;
        const noSubmissions = await this.noSubmissions.exists;
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
        await clickSelector(`.submission-entry[data-id="${id}"] .submission-entry__link`);
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

    public async newSubmission(articleType: ArticleType): Promise<void> {
        await clickSelector(this.newSubmissionButton);
        await t.expect(this.newSubmissionContainer.exists).ok();
        await t.click(this.articleTypeSelect); // Keeping .click due to react-select click handling
        await t.click(this.articleTypeOptions.withText(articleType));
        await t.expect(this.articleTypeValue.textContent).eql(articleType);
        await clickSelector(this.continueButton);
        if (['Short Report', 'Research Article', 'Tools and Resources'].includes(articleType)) {
            await t.click(this.infoContinueButton);
        }
    }

    public async deleteSubmission(id: string): Promise<void> {
        if ((await this.getDashboardState()) !== DashboardState.WithSubmissions) {
            console.warn('no submissions to delete');
            return;
        }
        await clickSelector(`.submission-entry[data-id="${id}"] .submission-entry__icon`);
        await clickSelector(this.confirmDeleteButton);
    }

    public async getSubmissionItem(id: string): Promise<Selector> {
        return this.submissionEntry.withAttribute('data-id', id);
    }
}
