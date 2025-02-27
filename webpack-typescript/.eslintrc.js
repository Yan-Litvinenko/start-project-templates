module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: ['airbnb-typescript/base', 'plugin:prettier/recommended', 'prettier'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', disallowTypeAnnotations: true },
        ],

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
