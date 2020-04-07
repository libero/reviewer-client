module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/test-utils/setup.ts'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test-utils/fileTransform.js',
        '\\.(css|scss)$': '<rootDir>/test-utils/styleTransform.js',
        // "i18next": "<rootDir>/mocks/reacti18nextMock.js"
        
    },
    globals: {
        CONFIG: {
            API_HOST: 'http://localhost',
            LOGIN_URL: '',
        },
    },
};
