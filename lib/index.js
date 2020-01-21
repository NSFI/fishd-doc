/* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackDevConfig = require('./build/webpack.config.dev.site');
const genWebpackProdConfig = require('./build/webpack.config.prod.site');
const webpackDllConfig = require('./build/webpack.config.dll.site');
const getDocConfig = require('./utils/getDocConfig');
const openBrowser = require('react-dev-utils/openBrowser');
const { resolveProject } = require('./utils');
const {
	chalkError,
	chalkSuccess,
	chalkWarning,
	chalkProcessing
} = require('./utils/index');

// 启动doc项目
exports.start = function(options) {
	const configFile = path.join(
		process.cwd(),
		options.config || 'doc.config.js'
	);

	const docConfig = getDocConfig(configFile);

	webpackDevConfig.entry = {
		[docConfig.entryName]: [
			`webpack-dev-server/client?http://localhost:${docConfig.port}`,
			`webpack/hot/only-dev-server`,
			`react-hot-loader/patch`,
			docConfig.theme
		]
	};

	const htmlFileName = docConfig.htmlFileName + '.html';

	webpackDevConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: htmlFileName,
			template: docConfig.htmlTemplate,
			chunks: [docConfig.entryName],
			favicon: ''
		})
	);

	const customerConfig = docConfig.webpackConfig(webpackDevConfig);

	const bundler = webpack(customerConfig);
	new WebpackDevServer(bundler, {
		index: htmlFileName,
		contentBase: docConfig.themeDir, // 设置静态文件实际目录
		publicPath: '/',
		hot: true,
		hotOnly: true,
		stats: 'errors-only',
		open: false,
		progress: false
	}).listen(docConfig.port, '0.0.0.0', error => {
		openBrowser(`http://localhost:${docConfig.port}/#/home`);
		if (error) {
			throw error;
		}
	});
};

// 打包doc项目
exports.build = function(options) {
	const configFile = path.join(
		process.cwd(),
		options.config || 'doc.config.js'
	);

	const docConfig = getDocConfig(configFile);

	if (!docConfig.outputPath) {
		return console.log(chalkWarning('😢 outputPath配置不能为空!'));
	}

	const genWebpackProdConfig = genWebpackProdConfig({
		entry: {
			[docConfig.entryName]: [docConfig.theme]
		},
		output: {
			path: resolveProject(docConfig.outputPath),
			publicPath: docConfig.publicPath || '/'
		},
		MiniCssExtractPluginPublicPath: docConfig.MiniCssExtractPluginPublicPath
	})

	const htmlFileName = docConfig.htmlFileName + '.html';

	if (docConfig.dll) {
		const dllJsPath = resolveProject(`./public/dll/${docConfig.dll.name}.js`);
		if (!fs.existsSync(dllJsPath)) {
			return console.log(chalkWarning('😢 请先执行dll打包!'));
		} else {
			console.log(chalkSuccess('😊 dll依赖已构建!'));
		}
		webpackProdConfig.plugins.push(
			new webpack.DllReferencePlugin({
				context: resolveProject('./'),
				manifest: resolveProject(
					`public/dll/${docConfig.dll.name}-manifest.json`
				)
			}),
			new HtmlWebpackPlugin({
				filename: htmlFileName,
				template: docConfig.htmlTemplate,
				chunks: [docConfig.entryName],
				favicon: ''
			}),
			new AddAssetHtmlPlugin({
				filepath: resolveProject(`./public/dll/${docConfig.dll.name}.js`),
				hash: true
			})
		);
	} else {
		webpackProdConfig.plugins.push(
			new HtmlWebpackPlugin({
				filename: htmlFileName,
				template: docConfig.htmlTemplate,
				chunks: [docConfig.entryName],
				favicon: ''
			})
		);
	}

	const customerConfig = docConfig.webpackConfig(webpackProdConfig);

	const bundler = webpack(customerConfig);

	bundler.run((error, stats) => {
		if (error) {
			// so a fatal error occurred. Stop here.
			console.log(chalkError(error));
			return 1;
		}

		const jsonStats = stats.toJson();

		if (jsonStats.hasErrors) {
			return jsonStats.errors.map(error => console.log(chalkError(error)));
		}

		if (jsonStats.hasWarnings) {
			console.log(chalkWarning('Webpack generated the following warnings: '));
			jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
		}

		console.log(
			stats.toString({
				colors: true,
				hash: true,
				version: true,
				children: false,
				chunks: false,
				modules: false,
				chunkModules: false
			})
		);

		// if we got this far, the build succeeded.
		console.log(
			chalkSuccess(
				"Your app is compiled in production mode in /dist. It's ready to roll!"
			)
		);

		return 0;
	});
};

// 打包doc dll公共包
exports.dll = function(options) {
	const configFile = path.join(
		process.cwd(),
		options.config || 'doc.config.js'
	);

	const docDllConfig = getDocConfig(configFile);

	if (!docDllConfig.dll) {
		return console.log(chalkWarning('未配置dll，无需打包!'));
	}

	webpackDllConfig.entry = {
		[docDllConfig.dll.name]: docDllConfig.dll.value
	};

	const bundler = webpack(webpackDllConfig);

	bundler.run((error, stats) => {
		if (error) {
			// so a fatal error occurred. Stop here.
			console.log(chalkError(error));
			return 1;
		}

		const jsonStats = stats.toJson();

		if (jsonStats.hasErrors) {
			return jsonStats.errors.map(error => console.log(chalkError(error)));
		}

		if (jsonStats.hasWarnings) {
			console.log(chalkWarning('Webpack generated the following warnings: '));
			jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
		}

		console.log(
			stats.toString({
				colors: true,
				hash: true,
				version: true,
				children: false,
				chunks: false,
				modules: false,
				chunkModules: false
			})
		);

		// if we got this far, the build succeeded.
		console.log(
			chalkSuccess(
				"Your app is compiled in production mode in /dist. It's ready to roll!"
			)
		);

		return 0;
	});
};
