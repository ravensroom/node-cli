const { program } = require('commander');
const pkg = require('../package.json');

const createInitCommand = require('@ncli/init');

function cli(args) {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', 'Debug mode on', false);

  createInitCommand(program);

  program.parse(process.argv);
}

module.exports = cli;
