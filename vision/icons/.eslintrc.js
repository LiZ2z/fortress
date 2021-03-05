const path = require('path');
const rootConfig = path.resolve(__dirname, '../../eslintrc.js');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    rootConfig,

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
  },
  rules: {
    'react/jsx-filename-extension': ['off', { extensions: ['.tsx', '.jsx'] }],
  },
};
