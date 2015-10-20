'use strict';

let webpack = require('webpack'),
    path = require('path');

module.exports = {
  context: __dirname,
  entry: [
    './client/build/js/app.js'
  ],
  output: {
      path: __dirname + '/client/dist/js',
      filename: 'bundle.js',
      clientPath: '/client/dist/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    root: [
      'web_modules',
      'node_modules',
      'shared'
    ],
    moduleDirectories: [
      'web_modules',
      'node_modules',
      'shared'
    ],
    extension: [
      '',
      '.js',
      '.json'
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  devtool: 'source-map'
};