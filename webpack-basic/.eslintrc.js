module.exports = {
    plugins: ['prettier'],
    extends: ['plugin:prettier/recommended', 'prettier'],
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
        'import/prefer-default-export': 'off',
        'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],

        'class-methods-use-this': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': ['error', { before: false, after: true }],
        'newline-per-chained-call': 'error',
        'object-curly-spacing': ['error', 'always'],
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-else-return': 'error',
        'no-useless-return': 'error',
    },
};
