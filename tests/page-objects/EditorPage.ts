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
        await t.expect(this.seniorEditorsPicker.find('.selected_people_list__item').count).eql(1);
        const addButton = this.seniorEditorsPicker.find('.pod__button');
        await t.click(addButton);
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.people-picker__selector_container').find('.typography__heading--h2').textContent).eql('Suggest Senior Editors');
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
    }

    public async addReviewer(): Promise<void> {
        await t.expect(this.suggestedReviewingEditorsPicker.find('.selected_people_list__item').count).eql(1);
        const addButton = this.suggestedReviewingEditorsPicker.find('.pod__button');
        await t.click(addButton);
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.people-picker__selector_container').find('.typography__heading--h2').textContent).eql('Suggest Reviewing Editors');
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
        await t.expect(Selector('.senior-editors-picker').find('.selected_people_list__item').count).eql(2);
    }

    public async next(): Promise<void> {
        await t.click(this.nextButton);
        await t.expect(this.editorsStep.visible).notOk();
    }
}
