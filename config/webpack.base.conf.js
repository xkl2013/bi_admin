const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./index');
const theme = require('../src/theme');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components/'),
      selfComponent: path.resolve(__dirname, '../src/selfComponent/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.build.publicPath,
    chunkFilename: 'js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true, // 允许模块引入
              importLoaders: 1,
            },
          }],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]-[hash:base64:5]',
          },
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            javascriptEnabled: true,
            modifyVars: theme,
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'less-loader',
          options: {
            // sourceMap: true,
            javascriptEnabled: true,
            modifyVars: theme,
          },
        }],
        exclude: /src/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
          },
        }],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 450000, // 入口文件大小，性能指示
    maxAssetSize: 450000, // 生成的最大文件
    hints: false, // 依赖过大是否错误提示
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        priority: '0',
        vendors: {
          name: 'vendor',
          chunks: 'async',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: -10,
          enforce: true,
          maxAsyncRequests: 1, // 最大异步请求数， 默认1
          maxInitialRequests: 1, // 最大初始化请求书，默认1
          reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[chunkhash:8].css',
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
      hash: true, // 防止缓存
    }),
  ],
};
