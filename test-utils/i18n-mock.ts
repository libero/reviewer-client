import data from '../public/locales/en/survey.json';

export {}
jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    useTranslation: () => {
        const stub = { t: (str: string, opts: {} = {}) => {
            if (opts['returnObjects']) {
                return data[str.split('.')[0]][str.split('.')[1]];
            }
            return str
        }};
        return stub;
    },
}));

