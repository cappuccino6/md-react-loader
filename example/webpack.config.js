const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {}
          }
        ]
      },
      {
        test: /\.(md)$/,
        use: [
          {
            loader: path.resolve(__dirname, '../lib/index.js'),
            options: {}
          }
        ]
      }
    ]
  }
}