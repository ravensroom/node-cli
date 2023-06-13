#!/usr/bin/env node
const { Command } = require('commander');
const pkg = require('../package.json');

// get a commander instance
// const { program } = commander.program;

// manually instantiate a command
const program = new Command();
program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d --debug', 'Turn on debug mode?', false)
  .option('-e, --envName <envName>', 'Get environment variables');

// console.log(program.opts().debug);
// console.log(program.opts().envName);
// console.log(program.opts());

// use command to register commands
// Command implemented using action handler (description is supplied separately to `.command`)
// Returns new command for configuring.
// <> : must
// [] : option
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository into a newly created directory')
  .option('-f --force', 'Force copy when file exists in destination')
  .action((source, destination, cmbObj) => {
    console.log(
      `cloned from ${source} to ${destination} with ${cmbObj.force} -f option`
    );
  });

// use addCommand to register sub command
const service = new Command('service');
program.addCommand(service);

service
  .command('start [port]')
  .description('Start service at some port')
  .action((port) => {
    console.log(`Start service at port ${port}`);
  });
service
  .command('stop [port]')
  .description('Stop service at some port')
  .action((port) => {
    console.log(`Stop service at port ${port}`);
  });

// this is to link different clis
// commander-test install
// Error: 'commander-test-install' does not exist
// program.command('install [name]', 'install package').alias('i');
// commander-test
// Error: 'commander-install' does not exist
program
  .command('install [name]', 'install package', {
    executableFile: 'commander-install',
    isDefault: true, // set this as the default command of the cli
    hidden: true, // hide the command in help
  })
  .alias('i');

// yargs.demandCommand
// it's to regulate any kind of command in the program
program
  .arguments('<cmd> [options]')
  .description('Arguments')
  .action((cmd, env) => {
    console.log(cmd, env);
  });

program.parse(process.argv);
