import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Ignore patterns
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/config/**',
      '**/styles/**',
      '**/.eslint-config-local/**',
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // Apply local airbnb-style config using compat
  ...compat.config({
    extends: ['./.eslint-config-local/index.cjs'],
  }),

  // Main configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        page: true,
        document: true,
        vi: true,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },

    rules: {
      // React plugin recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // Jest DOM rules
      ...jestDomPlugin.configs['flat/recommended'].rules,

      // Testing library rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',

      // Custom overrides
      'import/no-unresolved': [2, { ignore: ['test-utils'] }],
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',

      'no-console': 'off',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-restricted-syntax': ['warn', 'WithStatement'],
      'no-restricted-globals': ['error'],
      'no-underscore-dangle': 'off',
      'no-use-before-define': [
        'warn',
        {
          functions: false,
          classes: false,
          variables: false,
        },
      ],
      'no-mixed-operators': [
        'warn',
        {
          groups: [
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
          allowSamePrecedence: false,
        },
      ],

      eqeqeq: ['warn', 'smart'],
      'default-param-last': 'off',
      'arrow-parens': 'off',
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false,
          natural: false,
        },
      ],
      'max-len': [
        'error',
        {
          code: 130,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      // React-specific rules
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/require-default-props': [
        2,
        {
          functions: 'defaultArguments',
        },
      ],

      // React Hooks rules
      'react-hooks/exhaustive-deps': 'error',

      // Testing Library rules
      'testing-library/render-result-naming-convention': 'off',
      'testing-library/no-render-in-lifecycle': [
        'error',
        {
          allowTestingFrameworkSetupHook: 'beforeEach',
        },
      ],
    },
  },
];
