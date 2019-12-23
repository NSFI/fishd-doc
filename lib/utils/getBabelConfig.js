const { tmpdir } = require('os');

const { resolve } = require;

function babel() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules: 'commonjs',
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 8',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
    ],
    plugins: [
      resolve('react-hot-loader/babel'),
      resolve('@babel/plugin-proposal-numeric-separator'),
      resolve('@babel/plugin-proposal-logical-assignment-operators'),
      [
        resolve('@babel/plugin-proposal-class-properties'),
        { "loose": false }
      ],
      [
        resolve('@babel/plugin-proposal-decorators'),
        { decoratorsBeforeExport: true },
      ],
      [resolve('babel-plugin-transform-imports'), {
        "ppfish": {
          "transform": "ppfish/es/components/${member}"
        }
      }]
    ],
  };
}

module.exports = babel
