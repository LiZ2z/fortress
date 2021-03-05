const path = require('path');

module.exports = {
  root: true,

  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  // eslint-plugin-import for yarn pnp
  // https://www.npmjs.com/package/eslint-import-resolver-node
  settings: {
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
    'no-param-reassign': 'off',
    'no-console': 'off',
  },
};
