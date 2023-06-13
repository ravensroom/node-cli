## dev log

### initialize

```sh
$cd ncli

# initialize
$npx lerna init

# create locally global ncli entry
$npx lerna create cli
$cd packages/cli
$npm link
$ncli # execute packages/cli/bin/cli.js

# reminder: add deps..
$npx lerna add import-local packages/cli
$npx lerna add npmlog packages/cli
```

```js
// packages/cli/bin/cli.js
const importLocal = require('import-local');
const log = require('npmlog');
const entry = require('../lib/index');

// if this cli is published and the user has a local version then use the local version
if (importLocal(__filename)) {
  log.info('ncli', 'Using local version');
} else {
  // actual entry
  entry(process.argv.slice(2));
}
```

### commander
