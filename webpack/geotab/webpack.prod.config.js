const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('../webpack.prod.config');

const publicPath = './';

module.exports = merge.smartStrategy({ 'module.rules.use': 'prepend' })(common, {
  output: {
    publicPath
  },
  module: {
    rules: ([
      {
        test: /\.(png|jpg|ico)$/,
        loader: 'url-loader?limit=8192',
        options: {
          publicPath,
        }
      },
    ])
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'public/config.json',
        to: publicPath
      }
    ]),
  ]
});
