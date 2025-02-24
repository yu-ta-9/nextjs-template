import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginConfigPrettier from 'eslint-config-prettier';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import typescriptEslint from 'typescript-eslint';
import typescriptEslintParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next', 'dist/**'],
  },
  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals'),
  pluginConfigPrettier,
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'postcss.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
      'jsx-a11y': pluginJsxA11y,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
      'import/no-anonymous-default-export': ['error', { allowArray: false }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default eslintConfig;
