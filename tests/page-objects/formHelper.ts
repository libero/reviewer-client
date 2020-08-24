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

async function clickBack(): Promise<void> {
    await ClientFunction(() => {
        (document.querySelector('.submission-wizard-back-buttonn') as HTMLElement).click();
    })();
}

async function clickSelector(selector: string): Promise<void> {
    await ClientFunction((s: string) => {
        const element = document.querySelector(s) as HTMLElement;
        if (element) {
            element.click();
        } else {
            throw new Error('Element not present');
        }
    })(selector); // this needs to be here since Client function needs the selector passed in.
}

async function clickWithSelectorAndText(selector: string, text: string): Promise<void> {
    await ClientFunction((s: string, t: string) => {
        const element = Array.prototype.slice.call(document.querySelectorAll(s)).filter(function(el) {
            return el.textContent.includes(t);
        })[0];
        if (element) {
            element.click();
        } else {
            throw new Error('Element not present');
        }
    })(selector, text); // this needs to be here since Client function needs the selector passed in.
}

export { hasError, clickNext, clickSelector, clickWithSelectorAndText, clickBack };
