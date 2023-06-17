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

the generic, the implementation, and the code flow:

```js
// the generic
class Command {} // providing a skeleton for any real-command implementation
```

```js
// the implementation
// InitCommand extends Command and actually makes a command
// @ncli/init provides a function that creates the init command on the program instance
function Init(instance) {
  return new InitCommand(instance);
}
```

```js
// the code flow
// cli is our entry
// it utilizes the previous middlemen that encapsulates the creation of a command
// it's the final command provider who takes from other middle command providers
const { program } = require('commander');
const createInitCommand = require('@ncli/init');
createInitCommand(program);
```

### logging

basically just using npmlog everywhere for debugging,
and better cli logging UI.

- created under /utils
  `npx lerna create utils`
  `npx lerna add npmlog packages/utils`

- setup

```js
const log = require('npmlog');

if (process.argv.includes('--debug' || process.argv.includes('-d'))) {
  log.level = 'verbose';
} else {
  log.level = 'info';
}
// ...
module.exports = log;
```

- to use the exported log add as your dep
  `npx lerna add @ncli/utils packages/cli`

```js
const { log } = require('@ncli/utils');
log.verbose('init', name, opts); // replacing console.log
```
