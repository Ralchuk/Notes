import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
  // кавычки
  'quotes': ['error', 'single'],

  // точка с запятой
  'semi': ['error', 'always'],

  // отступы (по желанию)
  'indent': ['error', 2],

  // пробелы
  'space-before-function-paren': ['error', 'never'],

  // перенос строки
  'eol-last': ['error', 'always'],
}
  },
])
