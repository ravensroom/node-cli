import { log, debug } from '@ncli/utils';
import { program } from 'commander';
import { readFileSync } from 'fs';
import semver from 'semver';

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

export default function createCLI() {
  log.info('version', pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', 'Debug mode on', false)
    .hook('preAction', preAction);
  program.on('option:debug', function () {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode');
    }
  });
  program.on('command:*', function (obj) {
    log.error('Unknown command:', obj[0]);
  });
  return program;
}
