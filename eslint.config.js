import config from '@ph.fritsche/eslint-config'
import globals from 'globals'

export default [
    ...config,
    {
        rules: {
            // Disable this for now
            '@typescript-eslint/explicit-module-boundary-types': 0,
        },
    },
    {
        files: ['**/*.test.*'],
        languageOptions: {
            globals: globals.jest,
        },
    },
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
]
