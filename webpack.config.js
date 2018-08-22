const path = require('path');

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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
  },
  {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'mirador.min.js',
    },
    resolve: { extensions: ['.js'] },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
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
