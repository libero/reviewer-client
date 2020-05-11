import { Selector, t } from 'testcafe';

export class AuthorDetailsPage {
    private readonly nextButton = Selector('.submission-wizard-next-button');

    private readonly firstNameInput = Selector('.author-step__firstName');
    private readonly lastNameInput = Selector('.author-step__lastName');
    private readonly emailInput = Selector('.author-step__email');
    private readonly institutionInput = Selector('.author-step__institution');
    private readonly prefillInput = Selector('.author-step__prefill');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.firstNameInput.visible).ok();
        await t.expect(this.lastNameInput.visible).ok();
        await t.expect(this.emailInput.visible).ok();
        await t.expect(this.institutionInput.visible).ok();
        await t.expect(this.nextButton.visible).ok();
    }

    public async prefill(): Promise<void> {
        await t.click(this.prefillInput);  
    }

    public async populateForm(): Promise<void> {
        await this.setFirstName('first');
        await this.lastNameInput('last');
        await this.setEmail('email@elifesciences.org');
        await this.setInstitution('institution');
    }

    public async setEmail(input: string = 'email@elifesciences.org'): Promise<void> {
        await t.expect(this.emailInput.visible).ok();
        await t.typeText(this.emailInput, input);
        await t.expect(this.emailInput.value).eql(input);
    }

    public async getEmail(): Promise<string> {
        await t.expect(this.emailInput.visible).ok();
        return await this.emailInput.value;
    }

    public async setFirstName(input: string = 'first'): Promise<void> {
        await t.expect(this.firstNameInput.visible).ok();
        await t.typeText(this.firstNameInput, input);
        await t.expect(this.firstNameInput.value).eql(input);
    }

    public async getFirstName(): Promise<string> {
        await t.expect(this.firstNameInput.visible).ok();
        return await this.firstNameInput.value;
    }

    public async setLastName(input: string = 'last'): Promise<void> {
        await t.expect(this.lastNameInput.visible).ok();
        await t.typeText(this.lastNameInput, input);
        await t.expect(this.lastNameInput.value).eql(input);
    }

    public async getLastName(): Promise<string> {
        await t.expect(this.lastNameInput.visible).ok();
        return await this.lastNameInput.value;
    }

    public async setInstitution(input: string = 'institution'): Promise<void> {
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
    }
}
