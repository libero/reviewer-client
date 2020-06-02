import { Selector, t } from 'testcafe';

interface NameEmail {
    name: string;
    email: string;
}

export class EditorPage {
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    private readonly editorsStep = Selector('.editors-step');
    private readonly seniorEditorsPicker = Selector('.senior-editors-picker');
    private readonly suggestedReviewingEditorsPicker = Selector('.reviewing-editors-picker');
    private readonly toggleOpposedReviewingEditorsPicker = Selector('.excluded-toggle__action').withText(
        'exclude a reviewing editor',
    );
    private readonly toggleOpposedSeniorEditorsPicker = Selector('.excluded-toggle__action').withText(
        'exclude a senior editor',
    );
    private readonly opposedReviewingEditorsPicker = Selector('.opposed-reviewing-editors-picker');
    private readonly opposedSeniorEditorsPicker = Selector('.opposed-senior-editors-picker');
    private readonly opposedReviewingEditorsReason = Selector('#opposedReviewingEditorsReason');
    private readonly opposedSeniorEditorsReason = Selector('#opposedSeniorEditorsReason');
    private readonly suggestedReviewers = Selector('.suggestedReviewers__inputs');
    private readonly toggleOpposedReviewerPicker = Selector('.excluded-toggle__action').withText('exclude a reviewer');
    private readonly opposedReviewers = Selector('.opposedReviewers__inputs');
    private readonly opposedReviewersReason = Selector('#opposedReviewersReason');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.editorsStep.visible).ok();
        await t.expect(this.seniorEditorsPicker.visible).ok();
        await t.expect(this.suggestedReviewingEditorsPicker.visible).ok();
        await t.expect(this.nextButton.visible).ok();
    }

    public async populateForm(): Promise<void> {
        await this.addSeniorEditors();
        await this.addOpposingSeniorEditor();
        await this.addReviewingEditors();
        await this.addOpposingReviewingEditor();
        await this.addSuggestedReviewers();
        await this.addOpposingReviewer();
    }

    private async addPersonToPeoplePicker(picker: Selector): Promise<void> {
        await t.expect(picker.find('.selected_people_list__item').count).eql(1);
        const addButton = picker.find('.pod__button');
        await t.click(addButton);
        await this.assertPeoplePickerSearch();
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const button = Selector('.people-picker__modal_list--item').find('.pod__button');
        await t.expect(button.visible).ok();
        await t.click(button);
        await t.expect(Selector('.people-picker__selected-tabs').child('.people-picker__selected-tab').count).eql(1);
        await t.click(Selector('.modal__buttons_container').find('.button--primary'));
        await t.expect(Selector('.modal .modal__fullscreen').exists).eql(false);
        await t.expect(picker.find('.selected_people_list__item').count).eql(2);
    }

    public async addSeniorEditors(): Promise<void> {
        await this.addPersonToPeoplePicker(this.seniorEditorsPicker);
    }

    public async assertPeoplePickerSearch(): Promise<void> {
        const searchInput = Selector('#peoplePickerSearch');
        const peopleList = Selector('.people-picker__modal_list');
        await t.expect(searchInput.visible).ok();
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
        await t.typeText(searchInput, 'should not exist');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).eql(0);
        await t.selectText(searchInput).pressKey('delete');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
    }

    public async addReviewingEditors(): Promise<void> {
        await this.addPersonToPeoplePicker(this.suggestedReviewingEditorsPicker);
    }

    public async addOpposingSeniorEditor(): Promise<void> {
        await t.click(this.toggleOpposedSeniorEditorsPicker);
        await this.addPersonToPeoplePicker(this.opposedSeniorEditorsPicker);
        await this.setOpposedReason(this.opposedSeniorEditorsReason);
    }

    public async addOpposingReviewingEditor(): Promise<void> {
        await t.click(this.toggleOpposedReviewingEditorsPicker);
        await this.addPersonToPeoplePicker(this.opposedReviewingEditorsPicker);
        await this.setOpposedReason(this.opposedReviewingEditorsReason);
    }

    public async setOpposedReason(inputSelector, input = 'reason'): Promise<void> {
        await t.typeText(inputSelector, input);
        await t.expect(inputSelector.value).eql(input);
    }

    public async setNameEmailFields(
        selector: Selector,
        prefix: string,
        inputs: NameEmail[] = [{ name: 'name', email: 'name@elifesciences.org' }],
    ): Promise<void> {
        await t.expect(selector.visible).ok();
        let index = 0;
        for await (const { name, email } of inputs) {
            const nameInput = Selector(`[name="${prefix}[${index}].name"]`);
            const emailInput = Selector(`[name="${prefix}[${index}].email"]`);
            await t.typeText(nameInput, name);
            await t.expect(nameInput.value).eql(name);
            await t.typeText(emailInput, email);
            await t.expect(emailInput.value).eql(email);
            index = index + 1;
        }
        if (inputs.length === 6) {
            await t.expect(selector.find('.expanding-email-field__row').count).eql(inputs.length);
        } else {
            await t.expect(selector.find('.expanding-email-field__row').count).eql(inputs.length + 1);
        }
    }

    public async addSuggestedReviewers(inputs?: NameEmail[]): Promise<void> {
        await this.setNameEmailFields(this.suggestedReviewers, 'suggestedReviewers', inputs);
    }

    public async addOpposingReviewer(inputs?: NameEmail[], reason = 'Hates squirrels'): Promise<void> {
        await t.click(this.toggleOpposedReviewerPicker);
        await this.setNameEmailFields(this.opposedReviewers, 'opposedReviewers', inputs);
        await t.typeText(this.opposedReviewersReason, reason);
        await t.expect(this.opposedReviewersReason.value).eql(reason);
    }

    public async back(): Promise<void> {
        await t.click(this.backButton);
    }

    public async next(): Promise<void> {
        await t.click(this.nextButton);
    }
}
