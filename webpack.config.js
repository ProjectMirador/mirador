const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
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
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
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
