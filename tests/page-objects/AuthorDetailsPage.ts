import { Selector, t } from 'testcafe';

export class AuthorDetailsPage {
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    private readonly firstNameInput = Selector('.orcid-details__firstName');
    private readonly lastNameInput = Selector('.orcid-details__lastName');
    private readonly emailInput = Selector('.orcid-details__email');
    private readonly institutionInput = Selector('.orcid-details__institution');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.firstNameInput.visible).ok();
        await t.expect(this.lastNameInput.visible).ok();
        await t.expect(this.emailInput.visible).ok();
        await t.expect(this.institutionInput.visible).ok();
        await t.expect(this.nextButton.visible).ok();
        await t.expect(this.backButton.visible).ok();
    }

    public async populateForm(): Promise<void> {
        await this.setFirstName('first');
        await this.lastNameInput('last');
        await this.setEmail('email@elifesciences.org');
        await this.setInstitution('institution');
    }

    public async setEmail(input: string): Promise<void> {
        await t.expect(this.emailInput.visible).ok();
        await t.typeText(this.emailInput, input);
        await t.expect(this.emailInput.value).eql(input);
    }

    public async getEmail(): Promise<string> {
        await t.expect(this.emailInput.visible).ok();
        return await this.emailInput.value;
    }

    public async setFirstName(input: string): Promise<void> {
        await t.expect(this.firstNameInput.visible).ok();
        await t.typeText(this.firstNameInput, input);
        await t.expect(this.firstNameInput.value).eql(input);
    }

    public async getFirstName(): Promise<string> {
        await t.expect(this.firstNameInput.visible).ok();
        return await this.firstNameInput.value;
    }

    public async setLastName(input: string): Promise<void> {
        await t.expect(this.lastNameInput.visible).ok();
        await t.typeText(this.lastNameInput, input);
        await t.expect(this.lastNameInput.value).eql(input);
    }

    public async getLastName(): Promise<string> {
        await t.expect(this.lastNameInput.visible).ok();
        return await this.lastNameInput.value;
    }

    public async setInstitution(input: string): Promise<void> {
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

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await t.click(this.backButton);
    }
}
