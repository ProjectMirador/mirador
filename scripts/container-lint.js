const fs = require('fs');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies

const { error } = console;
const globOpts = { cwd: 'src/containers' };
const files = glob.sync('**/*.js', globOpts);

files.forEach((fileName) => {
  const fileContent = fs.readFileSync(`src/containers/${fileName}`).toString();
  const withPlugins = fileContent.indexOf('withPlugins(');
  if (withPlugins > 0) {
    const correctCall = fileContent.indexOf(`withPlugins('${fileName.replace('.js', '')}')`);
    if (withPlugins !== correctCall) {
      error(chalk.red(`Check withPlugins for ${fileName} for an incorrect target`));
    }
  }
});
