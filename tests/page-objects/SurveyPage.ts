import { Selector, t } from 'testcafe';

export class SurveyPage {
    private readonly pageWrapper: Selector = Selector('.survey');
    private readonly answer1Input: Selector = Selector('[name="answers[0].answer"]');
    private readonly answer2Input: Selector = Selector('[name="answers[1].answer"]');
    private readonly answer3Input: Selector = Selector('[name="answers[2].answer"]');
    private readonly doneSkipButton: Selector = Selector('.button.button--primary');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.pageWrapper.visible).ok({ timeout: 500 });
        await t.expect(this.answer1Input.visible).ok();
        await t.expect(this.answer2Input.visible).ok();
        await t.expect(this.answer3Input.visible).ok();
    }

    public async answerQuestion(question: 1 | 2 | 3, answer = 'squirrels'): Promise<void> {
        const inputSelector = this.getAnswerInput(question);
        await t.typeText(inputSelector, answer);
    }

    public async getAnswer(question: 1 | 2 | 3): Promise<string> {
        const inputSelector = this.getAnswerInput(question);
        return inputSelector.value;
    }

    private getAnswerInput(question: 1 | 2 | 3): Selector {
        switch (question) {
            case 1:
                return this.answer1Input;
            case 2:
                return this.answer2Input;
            case 3:
                return this.answer3Input;
        }
    }

    public async populateForm(): Promise<void> {
        await this.answerQuestion(1);
        await this.answerQuestion(2);
        await this.answerQuestion(3);
        await this.skipOrFinish();
    }

    public async skipOrFinish(): Promise<void> {
        await t.click(this.doneSkipButton);
    }
}
