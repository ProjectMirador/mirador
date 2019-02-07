process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

process.on('unhandledRejection', (err) => {
  throw err;
});

require('../config/env');
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const jest = require('jest'); // eslint-disable-line import/no-extraneous-dependencies

const argv = process.argv.slice(2);

/**
 * setTestConfig
 */
function setTestConfig() {
  let testConfig;
  if (process.env.REACT_APP_TEST_CONFIG) {
    testConfig = process.env.REACT_APP_TEST_CONFIG;
    setTestWatch();
  } else {
    testConfig = 'jest.json';
  }
  argv.push(`--config=${testConfig}`);
  console.log(chalk.cyan(`Running test configuration ${testConfig}`));
}

/**
 * setTestWatch
 */
function setTestWatch() {
  if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');
  }
}

setTestConfig();
jest.run(argv);
