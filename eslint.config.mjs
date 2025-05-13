import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
export default [
  {
    ignores: ['**/dist/', '**/config/', '**/coverage/', '**/styles/'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:prettier/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:testing-library/react',
      'plugin:jsdoc/recommended-error',
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        document: true,
        page: true,
        vi: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'testing-library': fixupPluginRules(testingLibrary),
    },
    rules: {
      'arrow-parens': 'off',
      'import/namespace': ['error', { allowComputed: true }],
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': [
        2,
        {
          ignore: ['test-utils'],
        },
      ],
      'import/prefer-default-export': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ArrowFunctionExpression: false, // disable for arrow functions
            ClassDeclaration: true,
            FunctionDeclaration: true,
            FunctionExpression: false, // disable for object-style methods
            MethodDefinition: true,
          },
        },
      ],
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-yields': 'off',
      'max-len': [
        'error',
        {
          code: 120,
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
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
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
      'prettier/prettier': [
        'error',
        {
          parser: 'flow',
          singleQuote: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx'],
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
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
      'testing-library/no-node-access': 'error',
      'testing-library/no-render-in-lifecycle': [
        'error',
        {
          allowTestingFrameworkSetupHook: 'beforeEach',
        },
      ],
      'testing-library/no-unnecessary-act': 'off',
      'testing-library/render-result-naming-convention': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.mjs'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  // TODO: review our use of these rules and fix to remove this exception
  {
    files: [
      '__tests__/src/components/*',
      '__tests__/integration/mirador/tests/*',
    ],
    rules: {
      'testing-library/no-container': 'off',
      'testing-library/no-node-access': 'off',
    },
  },
];
