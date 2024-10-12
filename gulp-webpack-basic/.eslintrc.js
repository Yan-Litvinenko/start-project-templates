module.exports = {
    plugins: ['prettier'],
    extends: ['plugin:prettier/recommended'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': ['error', { args: 'none' }],
        'no-var': 'error',
        'prefer-const': 'error',
        'no-undef': 'error',
        'no-redeclare': 'error',
        'no-duplicate-imports': 'error',
        'prettier/prettier': 'error',
    },
};
