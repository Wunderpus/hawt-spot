const HtmlWebPackPlugin = require('html-webpack-plugin');

// Declare HTML Webpack Plugin for Inclusion in WebPack
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  fileName: './index.html',
});

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            }
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
};
