#!/usr/bin/env node

const importLocal = require('import-local');
const log = require('npmlog');

const entry = require('../lib/index');

if (importLocal(__filename)) {
  log.info('ncli', 'Using local version');
} else {
  entry(process.argv.slice(2));
}
