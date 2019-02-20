const path = require('path');


module.exports = {
  common: {
    srcRoot: '../src',
  },
  dev: {
    port: 8000,
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    proxy: {},

  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    devtool: 'source-map',
    // Paths
    outputRoot: path.resolve(__dirname, '../dist'),
    outputSubDirectory: 'static',
    publicPath: '/',
  },
};
