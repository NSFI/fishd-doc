/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { resolveProject, resolveCli } = require('../utils')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {},
  stats: 'errors-only',
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'react-dom': require.resolve('@hot-loader/react-dom'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [resolveProject('./node_modules'), resolveCli('./node_modules'), 'node_modules'],
  },
  resolveLoader: {
    modules: [resolveProject('./node_modules'), resolveCli('./node_modules'), 'node_modules'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: resolveProject('tsconfig.json'),
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)(\?.+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'development'",
    }),
    new CaseSensitivePathsPlugin(),
    new WebpackBar({
      name: '🚚  FISHED_DOC',
      color: '#337EFF',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}
