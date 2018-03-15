module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'index.umd.js',
    libraryTarget: 'umd',
    library: 'mirador_poc_1',
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
};
