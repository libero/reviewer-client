import { Selector, t } from 'testcafe';

export class DetailsPage {
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
        await t.expect(this.titleInput.visible).ok();
        await t.expect(this.subjectsContainer.visible).ok();
        await t.expect(this.previouslyDiscussedToggle.exists).ok();
        await t.expect(this.previouslyDiscussedInput.exists).notOk();
        await t.expect(this.previouslyConsideredToggle.exists).ok();
        await t.expect(this.previouslySubmittedInput.exists).notOk();
        await t.expect(this.CosubmissionToggle.exists).ok();
        await t.expect(this.firstCosubmissionTitleInput.exists).notOk();
        await t.expect(this.secondCosubmissionTitleInput.exists).notOk();
        await t.expect(this.secondCosubmissionButton.exists).notOk();
    }

    async populateForm(): Promise<void> {
        // might be pre-populated
        await t.selectText(this.titleInput).pressKey('delete');
        await this.setTitle();
        await this.setSubjects();
        await this.setPreviouslyDiscussed();
        await this.setPreviouslyConsidered();
        await this.setCosubmission();
        await this.setSecondCosubmission();
    }

    public async setTitle(input = 'title'): Promise<void> {
        await t.expect(this.titleInput.visible).ok();
        await t.typeText(this.titleInput, input);
        await t.expect(this.titleInput.value).eql(input);
    }

    public async getTitle(): Promise<string> {
        return await this.titleInput.value;
    }

    public async setSubjects(input = 'Cell Biology'): Promise<void> {
        await t.expect(this.subjectsContainer.visible).ok();
        await t.click(this.subjectOptionsTypSelect);
        await t.click(this.subjectOptions.withText(input));
        await t.expect(this.subjectValue.textContent).eql(input);
    }

    public async getSubjects(): Promise<string> {
        return await this.subjectValue.textContent;
    }

    public async setPreviouslyDiscussed(input = 'previous'): Promise<void> {
        await t.expect(this.previouslyDiscussedToggle.visible).ok();
        await t.click(this.previouslyDiscussedToggle);
        await t.typeText(this.previouslyDiscussedInput, input);
        await t.expect(this.previouslyDiscussedInput.value).eql(input);
    }

    public async getPreviouslyDiscussed(): Promise<void> {
        await t.expect(this.previouslyDiscussedInput.visible).ok();
        await this.previouslyDiscussedInput.value;
    }

    public async setPreviouslyConsidered(input = 'previous'): Promise<void> {
        await t.expect(this.previouslyConsideredToggle.visible).ok();
        await t.click(this.previouslyConsideredToggle);
        await t.typeText(this.previouslySubmittedInput, input);
        await t.expect(this.previouslySubmittedInput.value).eql(input);
    }

    public async getPreviouslyConsidered(): Promise<void> {
        await t.expect(this.previouslySubmittedInput.visible).ok();
        await this.previouslySubmittedInput.value;
    }

    public async setCosubmission(input: string = 'first co'): Promise<void> {
        await t.expect(this.CosubmissionToggle.visible).ok();
        await t.click(this.CosubmissionToggle);
        await t.typeText(this.firstCosubmissionTitleInput, input);
        await t.expect(this.firstCosubmissionTitleInput.value).eql(input);
    }

    public async getCosubmission(): Promise<void> {
        await t.expect(this.firstCosubmissionTitleInput.visible).ok();
        await this.firstCosubmissionTitleInput.value;
    }

    public async setSecondCosubmission(input = 'second co'): Promise<void> {
        await t.expect(this.secondCosubmissionButton.visible).ok();
        await t.click(this.secondCosubmissionButton);
        await t.typeText(this.secondCosubmissionTitleInput, input);
        await t.expect(this.secondCosubmissionTitleInput.value).eql(input);
    }

    public async getSecondCosubmission(): Promise<void> {
        await t.expect(this.secondCosubmissionTitleInput.visible).ok();
        await this.secondCosubmissionTitleInput.value;
    }

    public async next(): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await t.click(this.nextButton);
    }

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await t.click(this.backButton);
    }
}
