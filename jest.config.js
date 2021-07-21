module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: [
        '/*(?<=.(test|spec).[jt]sx?)$',
    ],
    testMatch: [
        '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/test/**/*.{js,jsx,ts,tsx}',
    ],
    testPathIgnorePatterns: [
        '/_.*(?<!.test.[jt]sx?)$',
    ],
    transform: {
        '\\.([tj]sx?)$': 'ts-jest',
        '\\.jsx?$': '<rootDir>/jest.preprocess.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/test/_setup.ts',
    ],
    moduleNameMapper: {
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/test/_mocks/assets.ts`,
        ...require('ts-jest/utils').pathsToModuleNameMapper(
            require('./tsconfig.json').compilerOptions.paths,
            {prefix: '<rootDir>'},
        ),
    },
    testEnvironment: 'jsdom',
}
