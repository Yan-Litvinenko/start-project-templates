module.exports = {
    plugins: ['prettier'],
    //* Указывает на использование плагина Prettier для ESLint. Этот плагин интегрирует правила форматирования Prettier в ESLint.
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    //* Расширяет базовые правила ESLint из конфигурации airbnb-base и включает рекомендуемые настройки плагина Prettier.
    //* airbnb-base - это набор правил ESLint, основанных на стандартах Airbnb для JavaScript.
    //* plugin:prettier/recommended - это рекомендуемые настройки плагина Prettier, которые интегрируют Prettier с ESLint.
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    //* browser: указывает, что код предназначен для выполнения в браузере.
    //* es2021: указывает, что код использует возможности ECMAScript 2021.
    //* node: указывает, что код может выполняться в среде Node.js.
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    //* ecmaVersion: указывает версию ECMAScript, которую следует использовать для анализа кода. В данном случае, это ECMAScript 2021 (12).
    //* sourceType: указывает тип синтаксиса модулей. Здесь используется 'module', что указывает на использование модульного синтаксиса JavaScript (import/export).
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
