const path = require('path');
const webpack = require('webpack');
const paths = require('./config/paths');

const babelLoaderConfig = {
  include: paths.appSrc, // CRL
  loader: require.resolve('babel-loader'),
  options: {
    // Save disk space when time isn't as important
    cacheCompression: true,
    cacheDirectory: true,
    compact: true,
  },
  test: /\.(js|mjs|jsx)$/,
};

const baseConfig = [
  {
    entry: './src/index-core.js',
    module: {
      rules: [
        babelLoaderConfig,
      ],
    },
    output: {
      filename: 'm3core.umd.js',
      library: 'm3core',
      libraryTarget: 'umd',
      path: path.join(__dirname, 'dist'),
    },
  },
  {
    entry: './src/index.js',
    module: {
      rules: [
        babelLoaderConfig,
        {
          test: /\.s?css$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
      ],
    },
    output: {
      filename: 'mirador.min.js',
      library: 'Mirador',
      libraryExport: 'default',
      libraryTarget: 'umd',
      path: path.join(__dirname, 'dist'),
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
      }),
    ],
    resolve: { extensions: ['.js'] },
  },
];

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  return baseConfig.map((config) => {
    config.devtool = !isProduction ? 'eval-source-map' : false; // eslint-disable-line no-param-reassign
    return config;
  });
};
