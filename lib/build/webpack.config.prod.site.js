/* eslint-disable no-console */
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const { resolveProject, resolveCli } = require('../utils')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = function (options = {}) {
  let config = {
    mode: 'production',
    devtool: options.devtool || false,
    entry: options.entry,
    output: Object.assign({
      publicPath: '/',
      chunkFilename: 'js/[name].[chunkhash:12].js',
      filename: 'js/[name].[chunkhash:12].js'
    }, options.output),
    performance: {
      hints: false
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          extractComments: false
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': "'production'"
      }),
      new WebpackBar({
        name: '🚚  FISHED_DOC',
        color: '#337EFF'
      }),
      new FriendlyErrorsWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[id].[contenthash].css'
      }),
      new WebpackCleanupPlugin()
    ],
    resolve: {
      alias: {},
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      modules: [ resolveProject('./node_modules'), resolveCli('./node_modules'), 'node_modules' ]
    },
    resolveLoader: {
      modules: [ resolveProject('./node_modules'), resolveCli('./node_modules'), 'node_modules' ]
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: resolveProject('tsconfig.json')
          }
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
								publicPath: options.MiniCssExtractPluginPublicPath
							}
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: false
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: options.MiniCssExtractPluginPublicPath
							}
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
          loader: 'file-loader?name=[hash:12].[ext]'
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/'
          }
        },
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      ]
    }
  }
  if (options.analyzer) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
  return config
}
