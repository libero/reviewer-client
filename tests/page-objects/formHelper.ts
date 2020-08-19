import { ClientFunction } from 'testcafe';

async function hasError(selector: Selector): Promise<string> {
    const errorElement = selector.find('.typography__label--error');
    if (await errorElement.exists) {
        return errorElement.textContent;
    }
    return '';
}

async function clickNext(): Promise<void> {
    await ClientFunction(() => {
        (document.querySelector('.submission-wizard-next-button') as HTMLElement).click();
    })();
}

export { hasError, clickNext };
