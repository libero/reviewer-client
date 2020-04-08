const useMock = [k => k, {}];
useMock.t = k => k;
useMock.i18n = {};

module.exports = {
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    // withTranslation: () => Component => props => <Component t={k => k} {...props} />,
    // Trans: ({ children }) => renderNodes(children),
    // Translation: ({ children }) => children(k => k, { i18n: {} }),
    useTranslation: () => useMock,

    // mock if needed
    I18nextProvider: {},
    initReactI18next: {},
    setDefaults: {},
    getDefaults: {},
    setI18n: {},
    getI18n: {},
};
