const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./config/paths');

/** */
const baseConfig = mode => ({
  entry: ['./src/polyfills.js', './src/index.js'],
  module: {
    rules: [
      {
        include: paths.appPath, // CRL
        loader: require.resolve('babel-loader'),
        options: {
          // Save disk space when time isn't as important
          cacheCompression: true,
          cacheDirectory: true,
          compact: true,
          envName: mode,
        },
        test: /\.(js|mjs|jsx)$/,
      },
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
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
    }),
  ],
  resolve: {
    alias: {
      // needs shared global state for context to work
      'react-dnd': path.resolve(path.join(__dirname, 'node_modules', 'react-dnd')),
    },
    extensions: ['.js'],
  },
});

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  if (isProduction) {
    return {
      ...baseConfig(options.mode),
      devtool: 'source-map',
      mode: 'production',
      plugins: [
        ...(baseConfig.plugins || []),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      ],
    };
  }

  return {
    ...baseConfig(options.mode),
    devServer: {
      contentBase: './__tests__/integration/mirador',
      hot: true,
      port: 4444,
    },
    devtool: 'eval-source-map',
    entry: ['react-hot-loader/patch', ...baseConfig(options.mode).entry],
    mode: 'development',
  };
};
