'use strict';

const esm = require('..');
const assert = require('assert').strict;

assert.strictEqual(esm(), 'Hello from esm');
console.info('esm tests passed');
