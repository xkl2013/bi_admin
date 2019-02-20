const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //  用于优化或者压缩CSS资源
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./index');

// 构造出共享进程池,
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        exclude: [path.resolve(__dirname, '../config'), path.resolve(__dirname, '../node_modules')],
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel', 'eslint-loader'],
      },
    ],
  },
  devtool: config.build.devtool,
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new HappyPack({
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['cache-loader', 'babel-loader?cacheDirectory'], // 是用babel-loader解析
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      verboseWhenProfiling: true, // 显示信息
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
});


module.exports = webpackConfig;
