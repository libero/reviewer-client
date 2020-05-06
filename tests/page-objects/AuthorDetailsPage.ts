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

    public setEmail(string): void {

    }

    public setFirstName(string): void {

    }

    public setLastName(string): void {

    }

    public setInstitution(string): void {
        
    }

    public next(): void {
        this.browser.waitForElementVisible(this.nextButton).click(this.nextButton);
    }

    public back(): void {
        this.browser.waitForElementVisible(this.backButton).click(this.backButton);
    }
}