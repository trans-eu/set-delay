module.exports = {
    plugins: [
        'jsdoc',
    ],
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
    },
    overrides: [
        {
            files: ['**/*.cjs'],
            env: {
                'node': true,
            },
            parserOptions: {
                sourceType: 'commonjs',
            },
        },
    ],
    settings: {
        jsdoc: {
            mode: 'typescript',
        },
    },
};
