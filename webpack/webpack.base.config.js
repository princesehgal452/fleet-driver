const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/index.tsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "../src/assets/"),
      pages: path.resolve(__dirname, "../src/pages/"),
      components: path.resolve(__dirname, "../src/components/"),
      DriverApp: path.resolve(__dirname, "../src/DriverApp/"),
      models: path.resolve(__dirname, "../src/models/"),
      reducers: path.resolve(__dirname, "../src/reducers/"),
      Auth: path.resolve(__dirname, "../src/Auth/"),
      services: path.resolve(__dirname, "../src/services/"),
      theme: path.resolve(__dirname, "../src/theme/"),
      utils: path.resolve(__dirname, "../src/utils/"),
      constants: path.resolve(__dirname, "../src/constants/"),
    },
    extensions: ['.js', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }],
      },
      {
        test: /\.(png|jpg|ico)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '..'),
      verbose: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].chunk.css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        appMode: JSON.stringify(process.env.appMode),
      },
    }),
    new WriteFilePlugin(),
  ],
};
