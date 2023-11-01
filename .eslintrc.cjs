module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    // "@electron-toolkit/eslint-config-ts/recommended",
    // "@electron-toolkit/eslint-config-prettier",
  ],
};
