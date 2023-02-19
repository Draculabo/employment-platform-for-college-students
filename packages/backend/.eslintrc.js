module.exports = {
  extends: ['../../.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['scripts'],
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
  //   'prettier',
  //   'plugin:prettier/recommended',
  // ],
  settings: {
    'import/resolver': {
      typescript: {},
      map: [['@'], './src'],
      extension: ['.js', '.ts'],
    },
  },
};
