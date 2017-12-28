/* eslint-disable import/no-extraneous-dependencies */
// Used for development build.
const webpack = require('webpack');

export default {
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:7001/static/dist/',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    crosswordapp: [
      'babel-polyfill',
      'bootstrap',
      './static/js/index',
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    port: 7001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

