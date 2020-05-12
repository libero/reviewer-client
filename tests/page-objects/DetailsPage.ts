import { Selector, t } from 'testcafe';

export class DetailsPage {
    private readonly titleInput = Selector('#title');
    private readonly subjectsInput = Selector('#subjects');
    private readonly previouslyDiscussedToggle = Selector('#previouslyDiscussedContainer.toggle');
    private readonly previouslyDiscussedInput = Selector('#previouslyDiscussed');
    private readonly previouslyConsideredToggle = Selector('#previouslyConsideredContainer.toggle');
    private readonly previouslySubmittedInput = Selector('#previouslySubmitted');
    private readonly previouslyCosubmissionToggle = Selector('#cosubmission.toggle');
    private readonly firstCosubmissionTitleInput = Selector('#firstCosubmissionTitle');
    private readonly secondCosubmissionTitleInput = Selector('#secondCosubmissionTitle');
    private readonly secondCosubmissionButton = Selector('#secondCosubmissionTitle');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.titleInput.visible).ok();
        await t.expect(this.subjectsInput.visible).ok();
        await t.expect(this.previouslyDiscussedToggle.visible).ok();
        await t.expect(this.previouslyDiscussedInput.visible).notOk();
        await t.expect(this.previouslyConsideredToggle.visible).ok();
        await t.expect(this.previouslySubmittedInput.visible).notOk();
        await t.expect(this.previouslyCosubmissionToggle.visible).ok();
        await t.expect(this.firstCosubmissionTitleInput.visible).notOk();
        await t.expect(this.secondCosubmissionTitleInput.visible).notOk();
        await t.expect(this.secondCosubmissionButton.visible).ok();
    }

}
