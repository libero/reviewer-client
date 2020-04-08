jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    useTranslation: () => {
        const stub = { t: (str: string) => str };
        return stub;
    },
}));
