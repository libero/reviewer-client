export {}
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    useTranslation: () => {
        const stub = { t: (str: string, opts: {} = {}) =>
            opts['returnObjects'] ? [`${str}-0`,`${str}-1`,`${str}-2`,`${str}-3`,`${str}-4`] : str
        };
        return stub;
    },
}));
