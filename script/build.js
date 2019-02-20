const webpack = require('webpack');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const webpackConfig = require('../config/webpack.prod.conf');
const config = require('../config/index');

process.env.NODE_ENV = 'production';

// 打包进程开始
const spinner = ora('building for production...');
spinner.start();
rm(path.join(config.build.outputRoot), (err) => {
  if (err) throw err;
  webpack(webpackConfig, (buildErr, stats) => {
    spinner.stop();
    if (buildErr) throw buildErr;
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false,
      version: false, //  webpack 的版本信息
      entrypoints: false, // // 通过对应的 bundle 显示入口起点
    })}\n\n`);
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }
    console.log(chalk.cyan('  Build complete...  success\n'));
    console.log(chalk.green(
      '  Tip: built files are meant to be served over an HTTP server.\n'
        + '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
