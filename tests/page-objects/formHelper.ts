import { Selector, t } from 'testcafe';

async function hasError(selector: Selector): Promise<string> {
    const errorElement = selector.find('.typography__label--error');
    if (await errorElement.exists) {
        return errorElement.textContent;
    }
    return '';
}

async function clickNext(): Promise<void> {
    await t.click('.submission-wizard-next-button');
}

async function clickBack(): Promise<void> {
    await t.click('.submission-wizard-back-button');
}

async function clickSelector(selector: string): Promise<void> {
    await t.click(selector);
}

async function clickWithSelectorAndText(selector: string, text: string): Promise<void> {
    await t.click(Selector(selector).withText(text));
}

export { hasError, clickNext, clickSelector, clickWithSelectorAndText, clickBack };
