import { Selector, t } from 'testcafe';
import { clickNext, clickSelector, clickBack } from './formHelper';

export class DetailsPage {
    private readonly detailsStep = Selector('.details-page-step');
    private readonly titleInput = Selector('#title');
    private readonly subjectsContainer = Selector('.subject-area');
    private readonly subjectOptionsTypSelect: Selector = Selector('.select-field__control');
    private readonly subjectOptions: Selector = Selector('.select-field__option');
    private readonly subjectValue: Selector = Selector('.select-field__multi-value__label');
    private readonly previouslyDiscussedToggle = Selector('#previouslyDiscussedContainer-toggle');
    private readonly previouslyDiscussedInput = Selector('#previouslyDiscussed');
    private readonly previouslyConsideredToggle = Selector('#previouslyConsideredContainer-toggle');
    private readonly previouslySubmittedInput = Selector('#previouslySubmitted');
    private readonly CosubmissionToggle = Selector('#cosubmission-toggle');
    private readonly firstCosubmissionTitleInput = Selector('#firstCosubmissionTitle');
    private readonly secondCosubmissionButton = Selector('#secondCosubmissionTitleButton');
    private readonly secondCosubmissionTitleInput = Selector('#secondCosubmissionTitle');
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.detailsStep.exists).ok();
        await t.expect(this.titleInput.exists).ok();
        await t.expect(this.subjectsContainer.exists).ok();
        await t.expect(this.previouslyDiscussedToggle.exists).ok();
        await t.expect(this.previouslyDiscussedInput.exists).notOk();
        await t.expect(this.previouslyConsideredToggle.exists).ok();
        await t.expect(this.previouslySubmittedInput.exists).notOk();
        await t.expect(this.CosubmissionToggle.exists).ok();
        await t.expect(this.firstCosubmissionTitleInput.exists).notOk();
        await t.expect(this.secondCosubmissionTitleInput.exists).notOk();
        await t.expect(this.secondCosubmissionButton.exists).notOk();

        await t.expect(this.subjectsContainer.visible).ok();
        await t.expect(this.titleInput.visible).ok();
    }

    async populateAllFields(): Promise<void> {
        await t.selectText(this.titleInput).pressKey('delete');
        await this.setTitle();
        await this.setSubjects(['Cell Biology', 'Ecology']);
        await this.setPreviouslyDiscussed();
        await this.setPreviouslyConsidered();
        await this.setCosubmission();
        await this.setSecondCosubmission();
    }

    public async populateMinimalFields(): Promise<void> {
        // might be pre-populated
        await t.selectText(this.titleInput).pressKey('delete');
        await this.setTitle();
        await this.setSubjects();
    }

    public async assertPopulatedValues(values = { title: 'title', subjects: ['Cell Biology'] }): Promise<void> {
        await t.expect(this.titleInput.value).eql(values.title);
        for (let index = 0; index < values.subjects.length; index++) {
            await t.expect(this.subjectValue.nth(index).textContent).contains(values.subjects[index]);
        }
    }
    public async setTitle(input = 'title'): Promise<void> {
        await t.expect(this.titleInput.visible).ok();
        await t.typeText(this.titleInput, input);
        await t.expect(this.titleInput.value).eql(input);
    }

    public async clearTitle(): Promise<void> {
        await t.selectText(this.titleInput).pressKey('delete');
    }

    public async getTitle(): Promise<string> {
        return await this.titleInput.value;
    }

    public async setSubjects(inputs = ['Cell Biology']): Promise<void> {
        await t.expect(this.subjectsContainer.visible).ok();
        for (let i = 0; i < inputs.length; i++) {
            // Keeping .click due to withText use
            await t.click(this.subjectOptionsTypSelect);
            await t.click(this.subjectOptions.withText(inputs[i]));
            await t.expect(this.subjectValue.nth(i).exists).ok();
            await t.expect(this.subjectValue.nth(i).textContent).contains(inputs[i]);
        }
    }

    public async getSubjects(): Promise<string> {
        return await this.subjectValue.textContent;
    }

    public async togglePreviouslyDiscussed(): Promise<void> {
        await t.expect(this.previouslyDiscussedToggle.visible).ok();
        await clickSelector('#previouslyDiscussedContainer-toggle');
    }

    public async setPreviouslyDiscussed(input = 'previous'): Promise<void> {
        await this.togglePreviouslyDiscussed();
        await t.typeText(this.previouslyDiscussedInput, input);
        await t.expect(this.previouslyDiscussedInput.value).eql(input);
    }

    public async getPreviouslyDiscussed(): Promise<void> {
        await t.expect(this.previouslyDiscussedInput.visible).ok();
        await this.previouslyDiscussedInput.value;
    }

    public async togglePreviouslyConsidered(): Promise<void> {
        await t.expect(this.previouslyConsideredToggle.visible).ok();
        await clickSelector('#previouslyConsideredContainer-toggle');
    }

    public async setPreviouslyConsidered(input = 'previous'): Promise<void> {
        await this.togglePreviouslyConsidered();
        await t.typeText(this.previouslySubmittedInput, input);
        await t.expect(this.previouslySubmittedInput.value).eql(input);
    }

    public async getPreviouslyConsidered(): Promise<void> {
        await t.expect(this.previouslySubmittedInput.visible).ok();
        await this.previouslySubmittedInput.value;
    }

    public async toggleCosubmission(): Promise<void> {
        await t.expect(this.CosubmissionToggle.visible).ok();
        await clickSelector('#cosubmission-toggle');
    }

    public async setCosubmission(input = 'first co'): Promise<void> {
        await this.toggleCosubmission();
        await t.typeText(this.firstCosubmissionTitleInput, input);
        await t.expect(this.firstCosubmissionTitleInput.value).eql(input);
    }

    public async getCosubmission(): Promise<void> {
        await t.expect(this.firstCosubmissionTitleInput.visible).ok();
        await this.firstCosubmissionTitleInput.value;
    }

    public async setSecondCosubmission(input = 'second co'): Promise<void> {
        await t.expect(this.secondCosubmissionButton.visible).ok();
        await clickSelector('#secondCosubmissionTitleButton');
        await t.typeText(this.secondCosubmissionTitleInput, input);
        await t.expect(this.secondCosubmissionTitleInput.value).eql(input);
    }

    public async getSecondCosubmission(): Promise<void> {
        await t.expect(this.secondCosubmissionTitleInput.visible).ok();
        await this.secondCosubmissionTitleInput.value;
    }

    public async next(expectFailure = false): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await clickNext();
        if (!expectFailure) {
            await t.expect(this.detailsStep.exists).notOk();
        }
    }

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await clickBack();
        await t.expect(this.detailsStep.exists).notOk({ timeout: 5000 });
    }
}
