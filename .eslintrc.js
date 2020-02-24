module.exports = {
  root: true,
  env: {
 "node": true, "es6": true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  // required to lint *.vue files
  plugins: ['@typescript-eslint', 'jest'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'error',
  },
  globals: {
    context: false, // for jest
  },
}