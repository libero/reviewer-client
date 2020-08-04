import { Selector, t } from 'testcafe';

export class ValidationHelper {
    private readonly errorCss: string = 'span.typography__label--error';
    private readonly errors: Selector = Selector(this.errorCss);

    public async assertNumberOfErrors(count: number): Promise<void> {
        await t.expect(this.errors.count).eql(count);
    }

    public async assertErrorMessage(cssSelector: string, errorMessage: string): Promise<void> {
        await t.expect(await this.getErrorMessage(Selector(cssSelector))).eql(errorMessage);
    }

    public async getErrorMessage(component: Selector): Promise<string> {
        return component.find(this.errorCss).textContent;
    }

    public async getAllErrors(): Promise<string[]> {
        const errorsCount = await this.errors.count;
        const errorMessages = [];
        for (let i = 0; i < errorsCount; i++) {
            errorMessages.push(await this.errors.nth(i).textContent);
        }
        return errorMessages;
    }
}
