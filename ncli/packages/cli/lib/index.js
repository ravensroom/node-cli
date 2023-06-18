import { program } from 'commander';
import semver from 'semver';
import createInitCommand from '@ncli/init';
import { readFileSync } from 'fs';
import { log, debug } from '@ncli/utils';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url))
);

const MINIMUM_NODE_VERSION = '14.0.0';

function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (!semver.gte(process.version, MINIMUM_NODE_VERSION)) {
    throw new Error(
      chalk.red(
        `ncli needs at least node of version ${MINIMUM_NODE_VERSION} ro run`
      )
    );
  }
}

function preAction() {
  // check node version
  checkNodeVersion();
}

process.on('uncaughtException', (e) => {
  if (debug()) {
    console.log(e);
  } else {
    console.log(e.message);
  }
});

function cli(args) {
  log.info('version', pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', 'Debug mode on', false)
    .hook('preAction', preAction);

  createInitCommand(program);

  program.parse(process.argv);
}

export default cli;
