import { Selector, t } from 'testcafe';

export class EditorPage {
    private readonly nextButton = Selector('.submission-wizard-next-button');

    private readonly editorsStep = Selector('.editors-step');
    private readonly seniorEditorsPicker = Selector('.senior-editors-picker');
    private readonly suggestedReviewingEditorsPicker = Selector('.reviewing-editors-picker');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.editorsStep.visible).ok();
        await t.expect(this.seniorEditorsPicker.visible).ok();
        await t.expect(this.suggestedReviewingEditorsPicker.visible).ok();
        await t.expect(this.nextButton.visible).ok();
    }

    public async addEditor(): Promise<void> {
        const addButton = this.seniorEditorsPicker.find('.pod__button');
        await t.click(addButton);
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.typography__heading typography__heading--h2').textContent).eql('Suggest Senior Editors');
        await t.expect(Selector('.peoplePickerSearch').visible).ok();
        await t.click(Selector('.people-people-picker__modal_list--item').find('.pod__button'));
    }

    public async next(): Promise<void> {
        await t.click(this.nextButton);
        await t.expect(this.editorsStep.visible).notOk();
    }
}
