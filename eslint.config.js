import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { sourceType: 'module', ecmaVersion: 2023, globals: globals.node },
  },
]
