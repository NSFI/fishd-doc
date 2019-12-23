const { resolveCli, resolveProject } = require('../utils');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	mode: 'production',
	context: resolveProject('./'),
	entry: {},
	output: {
		path: resolveProject('./public/dll'),
		filename: '[name].js', //打包文件的名字
		library: '[name]_[hash]' //可选 暴露出的全局变量名
	},
	resolve: {
		modules: [
			resolveProject('./node_modules'),
			resolveCli('./node_modules'),
			'node_modules'
		]
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
		new WebpackBar({
			name: '🚚  FISHED_DOC DLL BUILD',
			color: '#337EFF'
		}),
		new webpack.DllPlugin({
			path: path.join(resolveProject('./public/dll'), '[name]-manifest.json'),
			name: '[name]_[hash]'
    })
	]
};
