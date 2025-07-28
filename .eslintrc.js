module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true
    },
    parser: 'vue-eslint-parser', // 👈 Necesario para .vue + TS
    parserOptions: {
      parser: '@typescript-eslint/parser', // 👈 Interpreta el <script lang="ts">
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      'plugin:@typescript-eslint/recommended', // 👈 Reglas TS
      'prettier'
    ],
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    ignorePatterns: ['**/public/**', '**/dist/**'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off'
    }
  }
  