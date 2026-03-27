import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';

export default [
  // Ignore patterns
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/config/**',
      '**/styles/**',
      '**/packages/**',
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

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
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...jestDomPlugin.configs['flat/recommended'].rules,
      ...testingLibraryPlugin.configs['flat/react'].rules,

      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      complexity: ['warn', 25],
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'dot-notation': ['error', { allowKeywords: true }],
      'eqeqeq': ['warn', 'smart'],
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never' }],
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-anonymous-default-export': 'off',
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 'off',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': [2, { ignore: ['test-utils', '@vitejs/plugin-react'] }],
      'import/prefer-default-export': 'off',
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
      'no-console': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-implicit-coercion': ['error', { boolean: false, number: true, string: true, allow: [] }],
      'no-lonely-if': 'error',
      'no-nested-ternary': 'warn',
      'no-new-func': 'error',
      'no-param-reassign': ['error', { props: true}],
      'no-restricted-globals': [
        'error',
        { name: 'isFinite', message: 'Use Number.isFinite instead' },
        { name: 'isNaN', message: 'Use Number.isNaN instead' },
      ],
      'no-restricted-syntax': ['warn', 'WithStatement'],
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions' }],
      'no-undef': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-unused-vars': 'warn',
      'no-use-before-define': ['warn', { functions: false, classes: false, variables: false }],
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['warn', { VariableDeclarator: { array: false, object: true }, AssignmentExpression: { array: false, object: false } }],
      'prefer-rest-params': 'error',
      'prefer-template': 'warn',
      'radix': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/prefer-stateless-function': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [2, { functions: 'defaultArguments' }],
      'react/self-closing-comp': 'error',
      'react/style-prop-object': 'error',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      'testing-library/no-render-in-lifecycle': ['error', { allowTestingFrameworkSetupHook: 'beforeEach' }],
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

  // Test file overrides
  {
    files: ['**/__tests__/**', '**/*.test.js', '**/*.test.jsx', 'setupTest.js'],
    rules: {
      'no-undef': 'off', // Test globals (describe, it, expect, etc.) provided by vitest
    },
  },
];
