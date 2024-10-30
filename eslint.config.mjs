import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import jest from "eslint-plugin-jest";
import jestDom from "eslint-plugin-jest-dom";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import jsdoc from 'eslint-plugin-jsdoc';
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [{
    ignores: ["**/dist/", "**/config/", "**/coverage/", "**/styles/"],
}, ...fixupConfigRules(compat.extends(
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
)), {

    languageOptions: {
          ecmaVersion: 6,
          globals: {
              ...jest.environments.globals.globals,
              document: true,
              page: true,
          },
          parser: babelParser,
          sourceType: "module",
    },
    plugins: {
        jest,
        "jest-dom": fixupPluginRules(jestDom),
        jsdoc,
        jsxA11y,
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        "testing-library": fixupPluginRules(testingLibrary),
    },

    rules: {
        "arrow-parens": "off",
        "default-param-last": "off",
        eqeqeq: ["warn", "smart"],
        "import/no-anonymous-default-export": "off",


        "import/no-unresolved": [2, {
            ignore: ["test-utils"],
        }],

        "import/prefer-default-export": "off",

        "jsdoc/require-jsdoc": ["error", {
                    minLineCount: 6,
                    require: {
                        ArrowFunctionExpression: true,
                        ClassDeclaration: true,
                        FunctionDeclaration: true,
                        FunctionExpression: true,
                        MethodDefinition: true,
                    },
                }],

        "jsx-a11y/no-autofocus": "warn",

        "max-len": ["error", {
            code: 120,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        "no-console": "off",

        "no-mixed-operators": ["warn", {
                    allowSamePrecedence: false,
                    groups: [
                        ["&", "|", "^", "~", "<<", ">>", ">>>"],
                        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                        ["&&", "||"],
                        ["in", "instanceof"],
                    ],
        }],
        "no-param-reassign": ["error", { "props": false }],

        "no-restricted-globals": ["error"],
        "no-restricted-syntax": ["warn", "WithStatement"],
        "no-undef": "off",
        "no-underscore-dangle": "off",
        "no-unused-expressions": ["error", {
            allowShortCircuit: true,
            allowTernary: true,
        }],
        "no-unused-vars": "off",

        "no-use-before-define": ["warn", {
            classes: false,
            functions: false,
            variables: false,
        }],

        "react-hooks/exhaustive-deps": "error",

        "react/function-component-definition": "off",

        "react/jsx-filename-extension": [1, {
            extensions: [".js", ".jsx"],
        }],

        "react/jsx-props-no-spreading": "off",
        "react/jsx-uses-react": "off",
        "react/prefer-stateless-function": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "sort-keys": ["error", "asc", {
            caseSensitive: false,
            natural: false,
        }],

        "testing-library/no-render-in-lifecycle": ["error", {
                    allowTestingFrameworkSetupHook: "beforeEach",
        }],
        "testing-library/render-result-naming-convention": "off",

    },
    settings: {
      react: {
        version: "detect",
      },
    },
}];
