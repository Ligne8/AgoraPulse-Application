module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'import',
  ],
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'warn',

    'react/prop-types': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
