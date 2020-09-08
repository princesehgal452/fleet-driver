const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const webpack = require('webpack');


module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
