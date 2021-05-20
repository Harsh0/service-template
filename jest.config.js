module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['**/src/**/*.{js,ts}', '!**/node_modules/**'],
    coverageReporters: ['html', 'json', 'lcov', 'cobertura', 'text', 'clover'],
    coverageThreshold: {
        global: {
            branches: 5,
            functions: 2,
            lines: 8,
        },
    },
    modulePathIgnorePatterns: ['node_modules'],
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
};
