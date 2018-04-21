/* eslint-disable import/no-extraneous-dependencies */
// Used for development build.
const webpack = require('webpack');

export default {
  output: {
    filename: '[name].js',
    publicPath: '/crosswords/static/dist/',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['react', 'stage-2', 'env'],
        },
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
    port: 7000,
    host: '0.0.0.0',
    public: 'vm.aerolith.org',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 5000,
  },
};

