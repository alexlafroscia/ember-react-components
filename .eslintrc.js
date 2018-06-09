module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'babel',
    'ember',
    'react',
    'prettier'
  ],
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

    'ember/no-attrs-in-components': 'off'
  },
  overrides: [
    // TypeScript files
    {
      parser: 'typescript-eslint-parser',
      files: [
        'addon/**/*.ts',
        'tests/**/*.ts'
      ],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off'
      }
    },
    // node files
    {
      files: [
        'commitlint.config.js',
        'index.js',
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'app/**',
        'addon/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};
