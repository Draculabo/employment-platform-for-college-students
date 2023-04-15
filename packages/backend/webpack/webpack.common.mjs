import paths from './paths.mjs';
import ESLintPlugin from 'eslint-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { NoEmitOnErrorsPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import pkg from 'webpack';
const { NoEmitOnErrorsPlugin } = pkg;
// const ESLintPlugin = require('eslint-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { NoEmitOnErrorsPlugin } = require('webpack');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export default {
  entry: [paths.entryFile],
  target: 'node',

  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true,
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
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
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
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
    mainFields: ['module', 'main'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new NoEmitOnErrorsPlugin(),
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
    // libraryTarget: 'var',
    chunkFormat: 'module',
    // library: 'myLibrary',
    libraryTarget: 'umd',
    // umdNamedDefine: true,
    module: true, //
  },
  experiments: {
    // asyncWebAssembly: true,
    // buildHttp: true,
    // layers: true,
    // lazyCompilation: true,
    outputModule: true,
    // syncWebAssembly: true,
    topLevelAwait: true,
  },
};
