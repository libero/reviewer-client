import { NightwatchBrowser } from 'nightwatch';

export class AuthorDetailsPage {
    private readonly nextButton: string = '.button--orcid';
    private readonly backButton: string = '.button--orcid';

    private readonly firstNameInput: string = '.orcid-details__firstName';
    private readonly lastNameInput: string = '.orcid-details__lastName';
    private readonly emailInput: string = '.orcid-details__email';
    private readonly institutionInput: string = '.orcid-details__institution';

    private browser: NightwatchBrowser;

    constructor(browser: NightwatchBrowser) {
        this.browser = browser;
    }

    public setEmail(input: string): void {
        this.browser
            .waitForElementVisible(this.emailInput)
            .assert.visible(this.emailInput)
            .setValue(this.emailInput, input);
    }

    public getEmail(): void {
        this.browser
        .waitForElementVisible(this.emailInput)
        .assert.visible(this.emailInput)
        .getValue(this.emailInput)
    }

    public setFirstName(input: string): void {
        this.browser
            .waitForElementVisible(this.firstNameInput)
            .assert.visible(this.firstNameInput)
            .setValue(this.firstNameInput, input);
    }

    public getFirstName(input: string): void {
        this.browser
            .waitForElementVisible(this.firstNameInput)
            .assert.visible(this.firstNameInput)
            .getValue(this.firstNameInput);
    }

    public setLastName(input: string): void {
        this.browser
            .waitForElementVisible(this.lastNameInput)
            .assert.visible(this.lastNameInput)
            .setValue(this.lastNameInput, input);
    }

    public getLastName(input: string): void {
        this.browser
            .waitForElementVisible(this.lastNameInput)
            .assert.visible(this.lastNameInput)
            .getValue(this.lastNameInput);
    }

    public setInstitution(input: string): void {
        this.browser
            .waitForElementVisible(this.institutionInput)
            .assert.visible(this.institutionInput)
            .setValue(this.institutionInput, input);
    }

    public getInstitution(input: string): void {
        this.browser
            .waitForElementVisible(this.institutionInput)
            .assert.visible(this.institutionInput)
            .getValue(this.institutionInput);
    }

    public next(): void {
        this.browser.waitForElementVisible(this.nextButton).click(this.nextButton);
    }

    public back(): void {
        this.browser.waitForElementVisible(this.backButton).click(this.backButton);
    }
}
