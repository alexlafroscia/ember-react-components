'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  plugins: ['babel', 'ember', 'react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    'ember/no-attrs-in-components': 'off',
    'ember/no-jquery': 'error'
  },
  overrides: [
    // TypeScript files
    {
      parser: 'typescript-eslint-parser',
      files: ['addon/**/*.ts', 'tests/**/*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off'
      }
    },
    // node files
    {
      files: [
        '.ember-cli.js',
        '.eslintrc.js',
        '.template-lintrc.js',
        'commitlint.config.js',
        'index.js',
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: ['app/**', 'addon/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here
        }
      )
    }
  ]
};
