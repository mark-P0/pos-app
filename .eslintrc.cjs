/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "@electron-toolkit/eslint-config-ts/recommended",
    // "@electron-toolkit/eslint-config-prettier",
  ],
  env: { browser: true, es2020: true, node: true },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
