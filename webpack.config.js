const path = require('path');

module.exports = [
  {
    entry: './index.js',
    output: {
      path: __dirname,
      filename: 'index.umd.js',
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
    entry: './__tests__/integration/react-example/index.jsx',
    output: {
      path: path.join(__dirname, '__tests__/integration/react-example'),
      filename: 'test-react.build.js',
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
      ],
    },
  },
];
