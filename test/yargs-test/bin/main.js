#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent');
const { alias } = require('yargs');

// hide first and second of argv args
const args = hideBin(process.argv);
// console.log(args);

const cli = yargs(args);

cli
  .usage('Usage: yargs-test [command] <options>')
  .demandCommand(
    1,
    'A command is required. Pass --help to see all available commands and options'
  )
  .recommendCommands()
  .fail((err, msg) => {
    console.log(err);
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(cli.terminalWidth())
  .epilogue(
    dedent`
      When a command fails, all logs are written to lerna-debug. log in the current working directory.
      For more information, find our manual at http://github.com/lerna/lerna
  `
  )
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd',
    },
  })
  .option('registry', {
    type: 'string',
    describe: 'Define global registry',
    alias: 'r',
  })
  .group(['debug'], 'Dev options')
  .group(['registry'], 'Extra options')
  .command(
    'init [name]',
    'Initialize a project',
    (yargs) => {
      yargs.option('name', {
        type: 'string',
        describe: 'Name of a project',
        alias: 'n',
      });
    },
    (argv) => {
      console.log(argv);
    }
  )
  .command({
    command: 'list',
    aliases: ['ll', 'ls', 'la'],
    describe: 'List local packages',
    builder: (yargs) => {},
    handler: (argv) => {
      console.log(argv);
    },
  })
  .strict().argv;
