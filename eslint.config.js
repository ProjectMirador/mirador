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
      // will be handled by prettier
      'max-len': 'off',
      // === Critical Code Quality Rules (from Airbnb) ===

      // Prevent bugs
      'no-param-reassign': ['error', { props: false }],
      'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions' }],
      'eqeqeq': ['warn', 'smart'],
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message: 'Use Number.isFinite instead',
        },
        {
          name: 'isNaN',
          message: 'Use Number.isNaN instead',
        },
      ],
      'no-restricted-syntax': ['warn', 'WithStatement'],

      // Code organization
      'prefer-destructuring': [
        'warn',
        {
          VariableDeclarator: { array: false, object: true },
          AssignmentExpression: { array: false, object: false },
        },
      ],
      'dot-notation': ['error', { allowKeywords: true }],
      'prefer-template': 'warn',
      'no-nested-ternary': 'warn',

      // Error prevention
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-return-assign': ['error', 'always'],
      'no-useless-return': 'error',
      'radix': 'error',

      // Function quality
      'complexity': ['warn', 20],
      'no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      'no-implicit-coercion': [
        'error',
        {
          boolean: false,
          number: true,
          string: true,
          allow: [],
        },
      ],
      'no-lonely-if': 'error',

      // Variable management
      'no-use-before-define': [
        'warn',
        {
          functions: false,
          classes: false,
          variables: false,
        },
      ],
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      // === Additional High-Value Rules ===
      'camelcase': [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: false,
        },
      ],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
      'prefer-const': 'error',
      'no-var': 'error',

      // === Import Rules ===
      'import/no-unresolved': [
        2,
        {
          ignore: ['test-utils', '@vitejs/plugin-react'],
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
        },
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'import/no-mutable-exports': 'error',

      // === React Rules (additional) ===
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/self-closing-comp': 'error',
      'react/style-prop-object': 'error',

      // === Project-Specific Overrides ===
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': [
        2,
        {
          functions: 'defaultArguments',
        },
      ],
      'react/function-component-definition': 'off',
      'react/prefer-stateless-function': 'off',
      'react-hooks/exhaustive-deps': 'error',

      // === Testing Library Rules ===
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
