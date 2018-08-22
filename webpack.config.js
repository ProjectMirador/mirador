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
];
