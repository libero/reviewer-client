import { Selector, t } from 'testcafe';

export class AuthorDetailsPage {
    private readonly authorStep = Selector('.author-step');

    private readonly nextButton = Selector('.submission-wizard-next-button');

    private readonly firstNameInput = Selector('.author-step__firstName input');
    private readonly lastNameInput = Selector('.author-step__lastName input');
    private readonly emailInput = Selector('.author-step__email input');
    private readonly institutionInput = Selector('.author-step__institution input');
    private readonly prefillInput = Selector('.author-step__prefill');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.authorStep.exists).ok();
        await t.expect(this.firstNameInput.exists).ok();
        await t.expect(this.lastNameInput.exists).ok();
        await t.expect(this.emailInput.exists).ok();
        await t.expect(this.institutionInput.exists).ok();
        await t.expect(this.nextButton.exists).ok();

        await t.expect(this.authorStep.visible).ok();
        await t.expect(this.firstNameInput.visible).ok();
        await t.expect(this.lastNameInput.visible).ok();
        await t.expect(this.emailInput.visible).ok();
        await t.expect(this.institutionInput.visible).ok();
        await t.expect(this.nextButton.visible).ok();
    }

    public async prefill(): Promise<void> {
        await t.click(this.prefillInput);
        await this.assertPopulatedValues({
            first: 'Tamlyn',
            last: 'Rhodes',
            email: 'test@email.com',
            inst: 'somewhere',
        });
    }
    public async populateAllFields(): Promise<void> {
        await this.populateMinimalFields();
    }

    public async populateMinimalFields(): Promise<void> {
        await this.setFirstName('first');
        await this.setLastName('last');
        await this.setEmail('email@elifesciences.org');
        await this.setInstitution('institution');
    }

    public async assertPopulatedValues(
        values = { first: 'first', last: 'last', email: 'email@elifesciences.org', inst: 'institution' },
    ): Promise<void> {
        await t.expect(await this.getFirstName()).eql(values.first);
        await t.expect(await this.getLastName()).eql(values.last);
        await t.expect(await this.getEmail()).eql(values.email);
        await t.expect(await this.getInstitution()).eql(values.inst);
    }

    public async setEmail(input = 'email@elifesciences.org'): Promise<void> {
        await t.expect(this.emailInput.visible).ok();
        await t.typeText(this.emailInput, input);
        await t.expect(this.emailInput.value).eql(input);
    }

    public async getEmail(): Promise<string> {
        await t.expect(this.emailInput.visible).ok();
        return await this.emailInput.value;
    }

    public async setFirstName(input = 'first'): Promise<void> {
        await t.expect(this.firstNameInput.visible).ok();
        await t.typeText(this.firstNameInput, input);
        await t.expect(this.firstNameInput.value).eql(input);
    }

    public async getFirstName(): Promise<string> {
        await t.expect(this.firstNameInput.visible).ok();
        return await this.firstNameInput.value;
    }

    public async setLastName(input = 'last'): Promise<void> {
        await t.expect(this.lastNameInput.visible).ok();
        await t.typeText(this.lastNameInput, input);
        await t.expect(this.lastNameInput.value).eql(input);
    }

    public async getLastName(): Promise<string> {
        await t.expect(this.lastNameInput.visible).ok();
        return await this.lastNameInput.value;
    }

    public async setInstitution(input = 'institution'): Promise<void> {
        await t.expect(this.institutionInput.visible).ok();
        await t.typeText(this.institutionInput, input);
        await t.expect(this.institutionInput.value).eql(input);
    }

    public async getInstitution(): Promise<string> {
        await t.expect(this.institutionInput.visible).ok();
        return await this.institutionInput.value;
    }

    public async next(): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await t.click(this.nextButton);
        await t.expect(this.authorStep.exists).notOk();
    }
}
