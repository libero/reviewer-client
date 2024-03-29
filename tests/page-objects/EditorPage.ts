import { Selector, t } from 'testcafe';
import { clickNext, clickSelector, clickBack, clickWithSelectorAndText } from './formHelper';

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

    private readonly maxOpposingSeniorEditors = 1;
    private readonly maxOpposingReviewingEditors = 2;
    private readonly minSeniorEditors = 2;
    private readonly minReviewingEditors = 2;
    private readonly maxSeniorEditors = 6;
    private readonly maxReviewingEditors = 6;

    public async assertOnPage(): Promise<void> {
        // long timeout accounts for e2e people api call delays
        await t.expect(this.editorsStep.exists).ok({ timeout: 30000 });
        await t.expect(this.seniorEditorsPicker.exists).ok();
        await t.expect(this.suggestedReviewingEditorsPicker.exists).ok();
        await t.expect(this.nextButton.exists).ok();
        await t.expect(this.editorsStep.visible).ok();
        await t.expect(this.seniorEditorsPicker.visible).ok();
        await t.expect(this.suggestedReviewingEditorsPicker.visible).ok();
        await t.expect(this.nextButton.visible).ok();
    }

    async populateAllFields(): Promise<void> {
        await this.addSeniorEditors(this.maxSeniorEditors, false);
        await this.addOpposingSeniorEditor();
        await this.addReviewingEditors(this.maxReviewingEditors, false);
        await this.addOpposingReviewingEditor();
        await this.addSuggestedReviewers();
        await this.addOpposingReviewer();
    }

    public async populateMinimalFields(): Promise<void> {
        await this.addSeniorEditors();
        await this.addReviewingEditors();
        await t.wait(1000);
    }

    public async assertPopulatedValues(
        values = { seniorEditorsCount: this.minSeniorEditors, reviewingEditorsCount: this.minReviewingEditors },
    ): Promise<void> {
        await t
            .expect(this.seniorEditorsPicker.find('.selected_people_list__item').count)
            .eql(values.seniorEditorsCount + 1);
        await t
            .expect(this.suggestedReviewingEditorsPicker.find('.selected_people_list__item').count)
            .eql(values.seniorEditorsCount + 1);
    }

    private async addPersonToPeoplePicker(
        picker: Selector,
        number = 1,
        pickerQuerySelector: string,
        includeOpenPodInSelectedCount = true,
    ): Promise<void> {
        await t.expect(Selector('.editors-step.spinner-center .spinner').exists).notOk();
        await t.expect(picker.find('.selected_people_list__item').count).eql(1);
        await clickSelector(`${pickerQuerySelector} .pod__button`);
        await t.expect(Selector('.modal__overlay').count).eql(1);
        await t.expect(Selector('.typography__heading--h2').visible).ok();
        await t.expect(Selector('#peoplePickerSearch').visible).ok();
        const addButtonSelector = Selector('.people-picker__modal_list--item .pod__button');
        await t.expect(Selector('.people-picker__modal_list--item').count).gte(number);

        for (let i = 0; i < number; i++) {
            const button = addButtonSelector.nth(i);
            await t.expect(button.visible).ok();
            await t.wait(1000);
            await clickSelector(`.people-picker__modal_list--item:nth-child(${i + 1}) .pod__button`);
            const clickedSelector = Selector(
                `.people-picker__modal_list--item:nth-child(${i + 1}) .pod__button .person-pod__selected_icon`,
            );
            await t.expect(clickedSelector.exists).ok({ timeout: 5000 });
        }

        await clickSelector('.modal__buttons_container .button--primary');
        await t.expect(Selector('.modal .modal__fullscreen').exists).eql(false);
        await t
            .expect(picker.find('.selected_people_list__item').count)
            .eql(number + (includeOpenPodInSelectedCount ? 1 : 0));
    }

    public async addSeniorEditors(
        selectionCount = this.minSeniorEditors,
        includeOpenPodInSelectedCount = true,
    ): Promise<void> {
        await this.addPersonToPeoplePicker(
            this.seniorEditorsPicker,
            selectionCount,
            '.senior-editors-picker',
            includeOpenPodInSelectedCount,
        );
    }

    public async assertPeoplePickerSearch(): Promise<void> {
        const searchInput = Selector('#peoplePickerSearch');
        const peopleList = Selector('.people-picker__modal_list');
        await t.expect(searchInput.visible).ok();
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
        await t.typeText(searchInput, 'should not exist');
        await t.expect(searchInput.value).eql('should not exist');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).eql(0);
        await t.selectText(searchInput).pressKey('delete');
        await t.expect(peopleList.child('.people-picker__modal_list--item').count).gt(0);
    }

    public async addReviewingEditors(
        selectionCount = this.minReviewingEditors,
        includeOpenPodInSelectedCount = true,
    ): Promise<void> {
        await this.addPersonToPeoplePicker(
            this.suggestedReviewingEditorsPicker,
            selectionCount,
            '.reviewing-editors-picker',
            includeOpenPodInSelectedCount,
        );
    }

    public async addOpposingSeniorEditor(): Promise<void> {
        await clickWithSelectorAndText('.excluded-toggle__action', 'exclude a senior editor');
        await this.addPersonToPeoplePicker(
            this.opposedSeniorEditorsPicker,
            this.maxOpposingSeniorEditors,
            '.opposed-senior-editors-picker',
            false,
        );
        await this.setOpposedReason(this.opposedSeniorEditorsReason);
    }

    public async addOpposingReviewingEditor(): Promise<void> {
        await clickWithSelectorAndText('.excluded-toggle__action', 'exclude a reviewing editor');
        await this.addPersonToPeoplePicker(
            this.opposedReviewingEditorsPicker,
            this.maxOpposingReviewingEditors,
            '.opposed-reviewing-editors-picker',
            false,
        );
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
        await clickWithSelectorAndText('.excluded-toggle__action', 'exclude a reviewer');
        await this.setNameEmailFields(this.opposedReviewers, 'opposedReviewers', inputs);
        await t.typeText(this.opposedReviewersReason, reason);
        await t.expect(this.opposedReviewersReason.value).eql(reason);
    }

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await clickBack();
        await t.expect(this.editorsStep.exists).notOk();
    }

    public async next(expectFailure = false): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await clickNext();
        if (!expectFailure) {
            await t.expect(this.editorsStep.exists).notOk({ timeout: 5000 });
        }
    }
}
