import { NightwatchBrowser, NightwatchCallbackResult } from 'nightwatch';

export class DashboardPage {
    private readonly dashboardContainer: string = '.dashboard';
    private readonly newSubmissionButton: string = '.no-submissions__buttons';
    private readonly menuLink: string = '.menu__link--active';
    private readonly submissionLinks: string = '.submission-entry__link';
    private readonly newSubmissionContainer: string = '.article-type';
    private readonly articleTypeSelect: string = '.select-field__input';
    private readonly articleTypeMenu: string = '.select-field__menu';
    private readonly articleTypeOptions: string = '.select-field__option';

    private browser: NightwatchBrowser;

    constructor(browser: NightwatchBrowser) {
        this.browser = browser;
    }

    public onPage(): DashboardPage {
        this.browser.waitForElementVisible(this.newSubmissionButton, 10000);
        return this;
    }

    private async getAllElements(options: NightwatchCallbackResult<{ ELEMENT: string }[]>): Promise<Array<unknown>> {
        const optionCount = ((options.value as unknown) as Array<string>).length;
        const results = [];
        for (let i = 1; i <= optionCount; i++) {
            results.push(
                new Promise(resolve => {
                    this.browser.getText(this.articleTypeOptions + `:nth-child(${i})`, result => {
                        resolve(result.value);
                    });
                }),
            );
        }
        return Promise.all(results);
    }

    public async newSubmission(articleType: string): Promise<void> {
        // should return the author details page object when its created
        this.browser.moveToElement(this.newSubmissionButton, 0, 0).mouseButtonClick(0);
        this.browser.click(this.articleTypeSelect);
        // this.browser.saveScreenshot('./tests/output/blah.png');
        this.browser.elements(
            'css selector',
            this.articleTypeOptions,
            async (options: NightwatchCallbackResult<{ ELEMENT: string }[]>) => {
                const result = await this.getAllElements(options);

                const foundIndex = result.indexOf(articleType);
                this.browser.assert.notEqual(foundIndex, -1, `Found the article type: ${articleType}`);

                console.log('found: ' + foundIndex);
                this.browser.click(this.articleTypeOptions + `:nth-child(${foundIndex + 1})`);
            },
        );
        this.browser.expect
            .element(this.articleTypeSelect)
            .text.to.equal(articleType)
            .before(10000);
    }
}

// const dashboardCommands = {v//     onPage: async function(this: NightwatchBrowser): Promise<void> {
//         this.page.
//         await this.expect.section('@newSubmission').to.be.visible;
//         const newSub = this.section.newSubmission;
//         await newSub.expect.element('@newSubmissionsButton');
//         this.assert.containsText('@newSubmissionsButton', 'START A NEW SUBMISSION');
//         await this.assert.containsText('@menuLink', 'Dashboard');
//     },
//     openSubmission: async function(this: NightwatchBrowser, id: string): Promise<void> {
//         await this.waitForElementVisible('@newSubmissionsButton', 10000);
//         const submissions = await this.elements('css selector', '@submissionLinks');
//         const submission = submissions.find((element: HTMLElement) => {
//             const href = element.getAttribute('href');
//             const path = href.split('/');
//             return path[2] === id;
//         });
//         if (submission) {
//             await submission.click();
//         }
//     },
//     createNewSubmission: async function(this: NightwatchBrowser, articleType: string): Promise<void> {
//         await this.click('@newSubmissionsButton');
//         await this.expect.section('@newSubmission').to.be.visible;
//         await this.click('@articleTypeSelect');
//         await this.waitForElementVisible('@articleTypeMenu', 2000);
//         const options = this.elements('css selector', '@articleTypeOptions');
//         const option = options.find((element: HTMLElement) => element.textContent === articleType);
//         await option.click();
//     },
// };

// const pageObject: EnhancedPageObject<[dashboardCommands]> = {
//     commands: [dashboardCommands],
//     sections: {
//         mainDashboard: {
//             selector: '.dashboard',
//             elements: {
//                 newSubmissionsButton: {
//                     selector: '.no-submissions__buttons',
//                 },
//                 menuLink: {
//                     selector: '.menu__link--active',
//                 },
//                 submissionsLinks: {
//                     selector: '.submission-entry__link',
//                 },
//             },
//         },
//         newSubmission: {
//             selector: '.article-type',
//             elements: {
//                 articleTypeSelect: {
//                     selector: '.select-field__input',
//                 },
//                 articleTypeMenu: {
//                     selector: '.select-field__menu',
//                 },
//                 articleTypeOptions: {
//                     selector: '.select-field__option',
//                 },
//             },
//         },
//     },
// };

// export = pageObject;
