import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                window: 'readonly',
                global: 'readonly',
                fetch: 'readonly',
                localStorage: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearTimeout: 'readonly',
                clearInterval: 'readonly',
                console: 'readonly',
                NodeJS: 'readonly',
                document: 'readonly',
                alert: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                getComputedStyle: 'readonly',
                preact: 'readonly',
                React: 'readonly',
                vi: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                process: 'readonly',
                module: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-useless-escape': 'warn',
        },
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
                window: 'readonly',
                fetch: 'readonly',
                localStorage: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearTimeout: 'readonly',
                clearInterval: 'readonly',
                console: 'readonly',
                NodeJS: 'readonly',
            },
        },
        rules: {
            'no-undef': 'error',
            'no-useless-escape': 'warn',
        },
    },
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'coverage/**',
            '**/*.config.js',
            'public/**',
        ],
    },
];
