import { Selector, t } from 'testcafe';

export class EditorPage {
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    private readonly editorsStep = Selector('.editors-step');
    private readonly seniorEditorsPicker = Selector('.senior-editors-picker');
    private readonly suggestedReviewingEditorsPicker = Selector('.reviewing-editors-picker');
    private readonly toggleOpposedEditorsPicker = Selector('.excluded-toggle__action');
    private readonly opposedEditorsPicker = Selector('.opposed-reviewing-editors-picker');

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
        await this.assertEditorSearch();
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.people-picker__selector_container').find('.typography__heading--h2').textContent).eql('Suggest Senior Editors');
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
        await t.expect(this.seniorEditorsPicker.find('.selected_people_list__item').count).eql(2);
    }

    public async assertEditorSearch(): Promise<void> {
        const searchInput = Selector('#peoplePickerSearch');
        const peopleList  = Selector('.people-picker__modal_list');
        await t.expect(searchInput.visible).ok();
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
        await t.typeText(searchInput, 'should not exist');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).eql(0);
        await t.selectText(searchInput).pressKey('delete');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
    }

    public async addReviewer(): Promise<void> {
        await t.expect(this.suggestedReviewingEditorsPicker.find('.selected_people_list__item').count).eql(1);
        const addButton = this.suggestedReviewingEditorsPicker.find('.pod__button');
        await t.click(addButton);
        await this.assertReviewerSearch();
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.people-picker__selector_container').find('.typography__heading--h2').textContent).eql('Suggest Reviewing Editors');
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
        await t.expect(this.suggestedReviewingEditorsPicker.find('.selected_people_list__item').count).eql(2);
    }

    public async addOpposingReviewingEditor(): Promise<void> {
        await t.click(this.toggleOpposedEditorsPicker);
        await t.expect(this.opposedEditorsPicker.find('.selected_people_list__item').count).eql(1);
        const addButton = this.opposedEditorsPicker.find('.pod__button');
        await t.click(addButton);
        await this.assertReviewerSearch();
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('.people-picker__selector_container').find('.typography__heading--h2').textContent).eql('Suggest Reviewing Editors');
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
        await t.expect(this.opposedEditorsPicker.find('.selected_people_list__item').count).eql(2);
    }

    public async assertReviewerSearch(): Promise<void> {
        const searchInput = Selector('#peoplePickerSearch');
        const peopleList  = Selector('.people-picker__modal_list');
        await t.expect(searchInput.visible).ok();
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
        await t.typeText(searchInput, 'should not exist');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).eql(0);
        await t.selectText(searchInput).pressKey('delete');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
    }

    public async back(): Promise<void> {
        await t.click(this.backButton);
    }

    public async next(): Promise<void> {
        await t.click(this.nextButton);
    }
}