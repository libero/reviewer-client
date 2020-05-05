import { EnhancedPageObject, NightwatchBrowser } from 'nightwatch';

const dashboardCommands = {
    onPage: async function(this: NightwatchBrowser): Promise<void> {
        await this.expect.section('@newSubmission').to.be.visible;
        const newSub = this.section.newSubmission;
        await newSub.expect.element('@newSubmissionsButton');
        this.assert.containsText('@newSubmissionsButton', 'START A NEW SUBMISSION');
        await this.assert.containsText('@menuLink', 'Dashboard');
    },
    openSubmission: async function(this: NightwatchBrowser, id: string): Promise<void> {
        await this.waitForElementVisible('@newSubmissionsButton', 10000);
        const submissions = await this.elements('css selector', '@submissionLinks');
        const submission = submissions.find((element: HTMLElement) => {
            const href = element.getAttribute('href');
            const path = href.split('/');
            return path[2] === id;
        });
        if (submission) {
            await submission.click();
        }
    },
    createNewSubmission: async function(this: NightwatchBrowser, articleType: string): Promise<void> {
        await this.click('@newSubmisisonButton');
        await this.expect.section('@newSubmission').to.be.visible;
        await this.click('@articleTypeSelect');
        await this.waitForElementVisible('@articeTypeMenu', 2000);
        const options = this.elements('css selector', '@articleTypeOptions');
        const option = options.find((element: HTMLElement) => element.textContent === articleType);
        await option.click();
    },
};

const pageObject = {
    commands: [dashboardCommands],
    sections: {
        mainDashboard: {
            selector: '.dashboard',
            elements: {
                newSubmissionsButton: {
                    selector: '.no-submissions__buttons',
                },
                menuLink: {
                    selector: '.menu__link--active',
                },
                submissionsLinks: {
                    selector: '.submission-entry__link',
                },
            },
        },
        newSubmission: {
            selector: '.article-type',
            elements: {
                articleTypeSelect: {
                    selector: '.select-field__input',
                },
                articleTypeMenu: {
                    selector: '.select-field__menu',
                },
                articleTypeOptions: {
                    selector: '.select-field__option',
                },
            },
        },
    },
};

export = pageObject;
