const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.base.config');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[name].js.map',
      lineToLine: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CompressionPlugin()
  ],
});
