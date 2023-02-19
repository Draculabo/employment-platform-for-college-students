module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      extensions: ['.js', '.jsx'],
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-v-for-key': 1,
    'vue/attributes-order': 1,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-unresolved': 0,
  },
};
