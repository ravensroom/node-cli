'use strict';

const cjsEntry = require('..');
const assert = require('assert').strict;

assert.strictEqual(cjsEntry(), 'Hello from cjsEntry');
console.info('cjsEntry tests passed');
