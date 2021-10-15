import { Selector, t } from 'testcafe';

async function hasError(selector: Selector): Promise<string> {
    const errorElement = selector.find('.typography__label--error');
    if (await errorElement.exists) {
        return errorElement.textContent;
    }
    return '';
}

async function clickSelector(selector: string): Promise<void> {
    const element = Selector(selector);
    await t.expect(element.exists).ok();
    await t.expect(element.visible).ok();
    await t.hover(element).click(element);
}

async function clickNext(): Promise<void> {
    await clickSelector('.submission-wizard-next-button');
}

async function clickBack(): Promise<void> {
    await clickSelector('.submission-wizard-back-button');
}

async function clickWithSelectorAndText(selector: string, text: string): Promise<void> {
    const element = Selector(selector).withText(text);
    await t.expect(element.exists).ok();
    await t.expect(element.visible).ok();
    await t.hover(element).click(element);
}

export { hasError, clickNext, clickSelector, clickWithSelectorAndText, clickBack };
