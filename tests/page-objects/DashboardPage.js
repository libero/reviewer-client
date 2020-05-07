/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

class DashboardPage {
    constructor(browser) {
        this.dashboardContainer = '.dashboard';
        this.dashboardNoSubmissions = '.no-submissions';
        this.newSubmissionButton = '#new-submission-button';
        this.continueButton = '.article-type__buttons > .button--primary';
        this.menuLink = '.menu__link--active';
        this.submissionLinks = '.submission-entry__link';
        this.newSubmissionContainer = '.article-type';
        this.articleTypeSelect = '.select-field__input';
        this.articleTypeMenu = '.select-field__menu';
        this.articleTypeOptions = '.select-field__option';
        this.dashboardTabs = '.dashboard__tabs';
        this.browser = browser;
    }
    onPage() {
        this.browser.waitForElementVisible(this.newSubmissionButton, 10000);
        return this;
    }
    async pageState() {
        const dashboard = await this.browser.isVisible(this.dashboardContainer);
        const noSubs = await this.browser.isVisible(this.dashboardNoSubmissions);
        console.log(dashboard, noSubs);
        if (dashboard) {
            return 'Submissions';
        } else {
            if (noSubs) {
                return 'NoSubmissions';
            }
        }
        return 'Unknown';
    }
    getAllSubmissions() {
        const submissions = [];
        // this.browser.elements(
        //     'css selector',
        //     this.dashboardTabs,
        //     async (rows: NightwatchCallbackResult<{ ELEMENT: string }[]>) => {
        //         const result = await this.getAllElements(rows);
        //         for (let index = 0; index < result.length; index++) {
        //             const submission = result[index];
        //             console.log(submission);
        //         }
        //     },
        // );
        return submissions;
    }
    async getAllElements(options) {
        const optionCount = options.value.length;
        const results = [];
        for (let i = 1; i <= optionCount; i++) {
            results.push(
                new Promise(resolve => {
                    this.browser.getText(this.articleTypeOptions + `:nth-child(${i})`, result => {
                        resolve(result.value);
                });
            }));
        }
        return Promise.all(results);
    }
    async newSubmission(articleType) {
        // should return the author details page object when its created
        this.browser.click(this.newSubmissionButton);
        this.browser.click(this.articleTypeSelect);
        this.browser.elements('css selector', this.articleTypeOptions, async (options) => {
            const result = await this.getAllElements(options);
            const foundIndex = result.indexOf(articleType);
            this.browser.assert.notEqual(foundIndex, -1, `Found the article type: ${articleType}`);
            this.browser.click(this.articleTypeOptions + `:nth-child(${foundIndex + 1})`);
        });
        this.browser.expect
            .element(this.articleTypeSelect)
            .text.to.equal(articleType)
            .before(1000);
        this.browser.click(this.continueButton);
    }
}
module.exports = { DashboardPage };
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
