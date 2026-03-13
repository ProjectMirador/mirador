module.exports = {
  extends: [
    "./rules/best-practices.cjs",
    "./rules/errors.cjs",
    "./rules/node.cjs",
    "./rules/style.cjs",
    "./rules/variables.cjs",
    "./rules/es6.cjs",
    "./rules/imports.cjs",
    "./rules/strict.cjs",
    "./rules/react.cjs",
    "./rules/react-a11y.cjs"
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {}
}
