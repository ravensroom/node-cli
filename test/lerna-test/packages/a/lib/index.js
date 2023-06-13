'use strict';

module.exports = a;

const b = require('@lerna-test-group/b');

function a() {
  console.log(b());
  return 'Hello from a';
}

a();
