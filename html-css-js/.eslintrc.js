module.exports = {
    plugins: ['prettier'],
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
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
        'no-use-before-define': ['error', { functions: false }], //* отключает проверку использования функций до их определения.
        'no-debugger': 'off', //* Отключаем использование debugger
        'no-console': 'off', //* Отключаем запрет на использование console
        'class-methods-use-this': 'off', //* Отключаем требование использования this в методах класса
        'newline-per-chained-call': 'error', //* Требуем использование пустой строки между вызовами методов цепочки
        'comma-spacing': ['error', { before: false, after: true }], //* Пробелы после запятых, но не перед
        'object-curly-spacing': ['error', 'always'], //* Пробелы внутри фигурных скобок объектов
        'comma-dangle': ['error', 'always-multiline'], //* Запятая в последней строке объектов и массивов в многострочных выражениях
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
