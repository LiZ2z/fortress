const path = require('path');

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'airbnb',

    // react-hooks
    'airbnb/hooks',

    // typescript
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // eslint-plugin-import
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    // prettier 必须放在最后，让所有的代码格式化检测由prettier负责
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  // eslint-plugin-import for yarn pnp
  // https://www.npmjs.com/package/eslint-import-resolver-node
  settings: {
    react: {
      version: 'detect',
    },

    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },

    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        paths: [
          path.resolve(__dirname, './fortress'),
          path.resolve(__dirname, './vision'),
        ],
      },
    },
  },
  rules: {
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': 'allow-with-description',
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
  },
};
