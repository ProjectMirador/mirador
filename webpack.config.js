const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
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

module.exports = {
  mode: 'production',
  entry: {
    m3core: './src/index-core.js',
    mirador3: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Mirador',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [eslintLoaderConfig, babelLoaderConfig, {
      test: /\.s?css$/,
      use: ['style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader', // compiles Sass to CSS, using Node Sass by default
      ],
    }],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        mangle: false,
      },
    }),
    ],
  },
};
