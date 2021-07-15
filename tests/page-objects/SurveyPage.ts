import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

export class SurveyPage {

    private readonly pageWrapper: Selector = Selector('.survey');
    private readonly page1: Selector = Selector('#survey-part-1');
    private readonly submittingAs: Selector = Selector('[name="submittingAs"]');
    private readonly independentResearcher: Selector = Selector('[name="independentResearcher"]');
    private readonly independentResearcherYear: Selector = Selector('[name="independentResearcherYear"]');

    private readonly page2: Selector = Selector('#survey-part-2');
    private readonly genderIdentity: Selector = Selector('[name="genderIdentity"]');
    private readonly genderSelfDescribe: Selector = Selector('[name="genderSelfDescribe"]');
    private readonly countryOfResidence: Selector = Selector('[name="countryOfResidence"]');
    private readonly secondCountryOfResidenceToggle: Selector = Selector('#secondCountryOfResidenceToggle');
    private readonly secondCountryOfResidence: Selector = Selector('[name="secondCountryOfResidence"]');
    private readonly countryIndentifyAs: Selector = Selector('[name="countryIndentifyAs"]');
    private readonly raceOrEthnicity: Selector = Selector('[name="raceOrEthnicity"]');

    private readonly doneSkipButton = 'button[type="submit"]';

    public async assertOnPage(): Promise<void> {
        await t.expect(this.pageWrapper.exists).ok();
    }

    private async assertOnPage1(): Promise<void> {
        await t.expect(this.page1.exists).ok();
        await t.expect(this.submittingAs.exists).ok();
        await t.expect(this.independentResearcher.exists).ok();       
    }

    private async assertOnPage2(): Promise<void> {
        await t.expect(this.page2.exists).ok();
        await t.expect(this.genderIdentity.exists).ok();
        await t.expect(this.countryOfResidence.exists).ok();
        await t.expect(this.secondCountryOfResidenceToggle.exists).ok();
        await t.expect(this.countryIndentifyAs.exists).ok();  
        await t.expect(this.raceOrEthnicity.exists).ok();
    }

    private async answerTextField(question: Selector, answer: string): Promise<void> {
        await t.expect(question.exists).ok();
        await t.expect(question.visible).ok();
        await t.typeText(question, answer);
    }

    private async getAnswerFromTextField(question: Selector): Promise<string> {
        await t.expect(question.exists).ok();
        return question.value;
    }

    private async answerRadioField(question: Selector, answer: string): Promise<void> {
        await t.expect(question.exists).ok();
        const input = Selector(`input[value="${answer}"]`);
        await t.expect(input.exists).ok();
        await clickSelector(`input[value="${answer}"]`);
    }

    private async answerSelectField(question: Selector, answer: string): Promise<void> {
        await t.expect(question.exists).ok();
        const input = question.prevSibling('.select-field__control').find('input');
        await t.typeText(input, answer).pressKey('enter');
    }

    private async getAnswerFromSelectField(question: Selector): Promise<string> {
        await t.expect(question.exists).ok();
        return question.value;
    }

    private async populatePage1(): Promise<void> {
        await this.assertOnPage1();
        await this.answerRadioField(this.submittingAs, 'first-author');
        await this.answerRadioField(this.independentResearcher, 'yes');
        await t.expect(this.independentResearcherYear.exists).ok();  
        await this.answerTextField(this.independentResearcherYear, '1990');
        await t.expect(await this.getAnswerFromTextField(this.independentResearcherYear)).eql('1990');
    }

    private async populatePage2(): Promise<void> {
        await this.assertOnPage2();
        await this.answerRadioField(this.genderIdentity, 'self-describe');
        await t.expect(this.genderSelfDescribe.exists).ok();  
        await this.answerTextField(this.genderSelfDescribe, 'popsicle');
        await this.answerSelectField(this.countryOfResidence, 'United Kingdom');
        await t.expect(await this.getAnswerFromSelectField(this.countryOfResidence)).eql('GB');
        await clickSelector('#secondCountryOfResidenceToggle * .content-toggle__toggle-btn');
        await t.expect(this.secondCountryOfResidence.exists).ok(); 
        await this.answerSelectField(this.secondCountryOfResidence, 'Albania');
        await t.expect(await this.getAnswerFromSelectField(this.secondCountryOfResidence)).eql('AL');
        await this.answerRadioField(this.countryIndentifyAs, 'yes');
        await this.raceOrEthnicity(this.independentResearcherYear, 'jedi');
    }

    private async goToNextPage(): Promise<void> {
        await t.expect(Selector(this.doneSkipButton).exists).ok();
        await t.expect(Selector(this.doneSkipButton).visible).ok();
        await clickSelector(this.doneSkipButton);
        await t.wait(500);
    }

    public async populateForm(): Promise<void> {
        await this.assertOnPage();
        await this.populatePage1();
        await this.goToNextPage();
        await this.populatePage2();
    }

    public async completeSurvey(): Promise<void> {
        await this.goToNextPage();
        await t.expect(Selector(this.doneSkipButton).exists).notOk();
    }
}
