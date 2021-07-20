export {}
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    useTranslation: () => {
        const stub = { 
            t: (str: string, opts: {} = {}) => {
                if (opts['returnObjects']) {
                    const obj = {}
                    for (let i = 0; i < 5; i++) {
                        obj[`${str}-${i}`] = `${str}-${i}`;
                    }
                    return obj;
                } else {
                    return str;
                }
            }
        };
        return stub;
    },
}));
