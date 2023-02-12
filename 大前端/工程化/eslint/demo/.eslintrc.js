const {defineConfig} = require('eslint-define-config')

module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended"],
})
