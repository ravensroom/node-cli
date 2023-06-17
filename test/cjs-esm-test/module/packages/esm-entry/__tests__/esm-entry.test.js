'use strict';

const esmEntry = require('..');
const assert = require('assert').strict;

assert.strictEqual(esmEntry(), 'Hello from esmEntry');
console.info('esmEntry tests passed');
