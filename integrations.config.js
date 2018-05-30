const path = require('path');

module.exports = [
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
