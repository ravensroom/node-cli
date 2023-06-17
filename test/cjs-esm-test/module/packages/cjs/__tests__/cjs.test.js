'use strict';

const cjs = require('..');
const assert = require('assert').strict;

assert.strictEqual(cjs(), 'Hello from cjs');
console.info('cjs tests passed');
