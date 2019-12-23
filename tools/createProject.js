const fs = require('fs');
const path = require('path');
const glob = require('glob');
const writeFileTree = require('./utils/writeFileTree');

const resolve = (...args) => path.resolve(__dirname, ...args);

const createProject = async function(options) {
	options = {
		cwd: process.cwd(),
		projectName: options.projectName,
		description: options.description || '',
		author: options.author || '',
		version: options.version || '1.0.0'
	};

	const context = path.resolve(options.cwd, options.projectName);

	let files = glob.sync('**/**', {
		cwd: resolve('../template'),
		nodir: true,
		dot: true,
		ignore: ['package.json']
	});

	let baseFilesMap = {};
	files.forEach(file => {
		baseFilesMap[file] = fs.readFileSync(resolve('../template', file));
	});

	const pkg = require('../template/package.json');
	pkg.name = options.projectName;
	pkg.description = options.description;
	pkg.author = options.author;
	pkg.version = options.version;
	pkg.dependencies['fishd-doc'] = '^' + require('../package.json').version;

	const ignoreFile = `.DS_Store\nnode_modules/\ndist/\nnpm-debug.log\nyarn-error.log\n.idea\n*.iml\n.vscode\n`;

	await writeFileTree(
		context,
		Object.assign(baseFilesMap, {
			'package.json': JSON.stringify(pkg, null, 2),
			'.gitignore': ignoreFile
		})
	);
};

module.exports = createProject;
