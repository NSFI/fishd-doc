/* eslint-disable no-console */
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const { resolveProject, resolveCli } = require('../utils');
const getBabelConfig = require('../utils/getBabelConfig');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	// devtool: 'cheap-module-source-map',
	devtool: false,
	entry: {},
	output: {
		publicPath: '/',
		chunkFilename: 'js/[name].[chunkhash:12].js',
		filename: 'js/[name].[chunkhash:12].js'
	},
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
		// new BundleAnalyzerPlugin()
	],
	resolve: {
		alias: {},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: [
			resolveProject('./node_modules'),
			resolveCli('./node_modules'),
			'node_modules'
		]
	},
	resolveLoader: {
		modules: [
			resolveProject('./node_modules'),
			resolveCli('./node_modules'),
			'node_modules'
		]
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: getBabelConfig()
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
							sourceMap: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
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
};
