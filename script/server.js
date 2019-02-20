

const webpack = require('webpack');
const chalk = require('chalk');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.dev.conf');
const config = require('../config/index');
const utils = require('./utils');


const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, {
  stats: {
    colors: true,
  },
  hot: true,
  open: true,
  noInfo: true,
  progress: true,
});
const server = new webpackDevServer(compiler, devServerOptions);
const PORT = process.env.PORT || config.dev.port || 8000;
server.listen(PORT, '127.0.0.1', () => {
  const ipDress = utils.getIPDress();
  console.log(chalk.green(`Starting server on http://localhost:${PORT}`));
  console.log(chalk.yellow('达到人生的巅峰'));
  console.log(chalk.green(`Starting server on ipv4 http://${ipDress}:${PORT}`));
});
