

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./index');
const utils = require('./utils');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        exclude: [path.resolve(__dirname, '../config'), path.resolve(__dirname, '../node_modules')],
        loader: ['babel-loader?cacheDirectory', 'eslint-loader'],
      },
    ],
  },
  devServer: {
    proxy: config.dev.proxy, // 代理
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    port: config.dev.port || 8000,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    publicPath: config.build.publicPath || '/',
    open: config.dev.open || true,
    inline: true,
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    watchOptions: { // 文件改动的通知(移除添加文件)
      poll: true,
    },
  },
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.HotModuleReplacementPlugin(), // 调用webpack的热更新插件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
    }),
  ],

});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      webpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      webpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [utils.reWirteHost(port, 'localhost')],
        },
        onErrors: utils.createNotifierCallback(),
      }));

      resolve(webpackConfig);
    }
  });
});
