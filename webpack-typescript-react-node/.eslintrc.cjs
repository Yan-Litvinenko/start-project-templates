module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: '.',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        browser: true,
        jest: true,
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

        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': [
            'error',
            { namedComponents: 'function-declaration', unnamedComponents: 'arrow-function' },
        ],

        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        ],

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
    settings: {
        react: {
            version: 'detect',
        },
    },
};