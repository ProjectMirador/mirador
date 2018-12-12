const path = require('path');
const paths = require('./config/paths');

const eslintLoaderConfig = {
  test: /\.(js|mjs|jsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),

      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: paths.appSrc,
};

const babelLoaderConfig = {
  test: /\.(js|mjs|jsx)$/,
  include: paths.appSrc, // CRL
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
            },
          },
        },
      ],
    ],
    cacheDirectory: true,
    // Save disk space when time isn't as important
    cacheCompression: true,
    compact: true,
  },
};

module.exports = [
  {
    entry: './src/store.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'm3core.umd.js',
      libraryTarget: 'umd',
      library: 'm3core',
    },
    module: {
      rules: [
        eslintLoaderConfig,
        babelLoaderConfig,
      ],
    },
  },
  {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'mirador.min.js',
      libraryTarget: 'umd',
      library: 'Mirador',
      libraryExport: 'default',
    },
    resolve: { extensions: ['.js'] },
    module: {
      rules: [
        eslintLoaderConfig,
        babelLoaderConfig,
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        }],
    },
  },
];
