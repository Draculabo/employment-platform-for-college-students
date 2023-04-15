const paths = require('./paths.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NoEmitOnErrorsPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: [paths.entryFile],
  target: 'node',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.eta$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'eta-templates',
              publicPath: 'dist/eta-templates',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
    parser: {
      javascript: {
        importExportsPresence: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': paths.appSrc,
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NoEmitOnErrorsPlugin(),
    new ESLintPlugin({
      fix: true,
      emitWarning: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.tsConfig,
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
          declaration: true,
        },
      },
    }),
  ],

  externals: [nodeExternals()],

  output: {
    filename: 'index.js',
    path: paths.dist,
  },
  experiments: {
    topLevelAwait: true,
  },
};
