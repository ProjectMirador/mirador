process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.on('unhandledRejection', (err) => {
  throw err;
});

require('../config/env');

const fs = require('fs');
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line import/no-extraneous-dependencies
const clearConsole = require('react-dev-utils/clearConsole'); // eslint-disable-line import/no-extraneous-dependencies
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles'); // eslint-disable-line import/no-extraneous-dependencies
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils'); // eslint-disable-line import/no-extraneous-dependencies
const openBrowser = require('react-dev-utils/openBrowser'); // eslint-disable-line import/no-extraneous-dependencies
const { checkBrowsers } = require('react-dev-utils/browsersHelper'); // eslint-disable-line import/no-extraneous-dependencies
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/devServer.config');

const appName = require(paths.appPackageJson).name;
const proxySetting = require(paths.appPackageJson).proxy;
const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appDevIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST),
      )}`,
    ),
  );
  console.log(
    "If this was unintentional, check that you haven't mistakenly set it in your shell.",
  );
  console.log(
    `Learn more here: ${chalk.yellow('http://bit.ly/CRA-advanced-config')}`,
  );
  console.log();
}

checkBrowsers(paths.appPath, isInteractive)
  .then(() => { // eslint-disable-line
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig,
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, (err) => { // eslint-disable-line
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
