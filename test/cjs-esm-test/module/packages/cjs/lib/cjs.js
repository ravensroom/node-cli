'use strict';

module.exports = cjs;

function cjs() {
  console.log('hello from cjs', __dirname, __filename);
}

// exports.cjs = cjs
// module.exports / exports.x should not be used together
