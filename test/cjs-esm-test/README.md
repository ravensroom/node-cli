## commonjs

It is the default type of a package if not otherwise appointed.

```js
const package = require('package');
module.exports = package;
//exports.add = (a, b) => a + b
```

## es module

```js
import package from 'package';
import localFile from './localFile.js'; // do not omit .js

export default package;
export const add = (a, b) => a + b;
// __dirname __filename not applicable in esm
```

## add esm to cjs

It's not recommended.

```js
const cjs = require('cjs');
// cannot use require syntax to load esm is cjs
// import('esm').then((esm) => esm.default());

(async function () {
  const esm = await import('esm');

  esm.default();
  cjs();
})();
```

## add cjs to esm

The syntax remains the same

```js
import esm from 'esm';
import cjs from 'cjs';

esm();
cjs();
```
