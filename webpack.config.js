var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'index.umd.js',
    libraryTarget:'umd',
    library: 'mirador_poc_1'
  },
  module: {
    loaders: [
      { test: path.join(__dirname, 'src'),
        loader: 'babel-loader' }
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
        ],
      },
    ],
  },
};
