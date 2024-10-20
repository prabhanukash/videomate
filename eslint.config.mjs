import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/*.config.mjs',
      'public/*',
      '**/node_modules',
      '**/.next',
      '**/build',
      '**/.github',
      '**/.vscode',
      '**/*.config.ts',
      '**/.dockerfile',
      '**/.gitignore',
      '**/.nvmrc',
      '**/.prettierrc',
      '**/*.d.ts',
      '**/*.config.js',
      '**/*.md',
      '**/yarn.lock'
    ]
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime'
  ),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      pluginReact
    },
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: { ...globals.browser, ...globals.node }
    },

    settings: {
      react: {
        version: 'detect' // Automatically detect the React version
      }
    },

    rules: {
      'max-len': [
        'error',
        {
          code: 200,
          ignoreUrls: true,
          ignoreStrings: true
        }
      ],

      'react/prop-types': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'property',
          format: ['camelCase'],
          filter: {
            regex: '^(Content-Type|Authorization)$',
            match: false
          }
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
];