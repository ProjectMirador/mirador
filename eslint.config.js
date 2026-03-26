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

    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        document: true,
        page: true,
        vi: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },

    plugins: {
      import: importPlugin,
      'jest-dom': jestDomPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'testing-library': testingLibraryPlugin,
    },

    rules: {
      // React plugin recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // Testing Library rules
      ...testingLibraryPlugin.configs['flat/react'].rules,

      // Jest DOM rules
      ...jestDomPlugin.configs['flat/recommended'].rules,

      // All custom rules in alphabetical order
      'arrow-parens': 'off',
      'default-param-last': 'off',
      eqeqeq: ['warn', 'smart'],
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': [
        2,
        { ignore: ['test-utils', '@vitejs/plugin-react'] },
      ],
      'import/prefer-default-export': 'off',
      'max-len': [
        'error',
        {
          code: 130,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-console': 'off',
      'no-mixed-operators': [
        'warn',
        {
          allowSamePrecedence: false,
          groups: [
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],
        },
      ],
      'no-restricted-globals': ['error'],
      'no-restricted-syntax': ['warn', 'WithStatement'],
      'no-undef': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-unused-vars': 'off',
      'no-use-before-define': [
        'warn',
        {
          classes: false,
          functions: false,
          variables: false,
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/prefer-stateless-function': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [
        2,
        {
          functions: 'defaultArguments',
        },
      ],
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false,
          natural: false,
        },
      ],
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      'testing-library/no-render-in-lifecycle': [
        'error',
        {
          allowTestingFrameworkSetupHook: 'beforeEach',
        },
      ],
      'testing-library/render-result-naming-convention': 'off',
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
];
