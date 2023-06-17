'use strict';

const cjs = require('cjs');
// import('esm').then((esm) => esm.default());

(async function () {
  const esm = await import('esm');

  esm.default();
  cjs();
})();
