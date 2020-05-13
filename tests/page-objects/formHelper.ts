async function hasError(selector: Selector): Promise<string> {
    const errorElement = selector.find('.typography__label--error');
    if (await errorElement.exists) {
        return errorElement.textContent;
    }
    return '';
}

export { hasError };
