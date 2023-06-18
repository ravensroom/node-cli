#!/usr/bin/env node
import importLocal from 'import-local';
import log from 'npmlog';

import entry from '../lib/index.js';

import { fileURLToPath } from 'node:url';
const fileName = fileURLToPath(import.meta.url);

if (importLocal(fileName)) {
  log.info('ncli', 'Using local version');
} else {
  entry(process.argv.slice(2));
}
