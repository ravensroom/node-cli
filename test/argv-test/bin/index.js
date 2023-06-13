#!/usr/bin/env node

const test = require('test-lib');
const argv = process.argv;
const pkg = require('../package.json');
//console.log(argv);

const command = argv[2];
const options = argv.slice(3);

// console.log(options);
// console.log(test.sum(1, 2));

if (options.length > 1) {
  const [option, param] = options;
  console.log(option, param);
  if (command) {
    if (test[command]) {
      test[command]({ option, param });
    } else {
      console.log('please enter a valid command');
    }
  } else {
    console.log('Please enter a command');
  }
}

if (command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '');
  if (globalOption === 'V' || globalOption === 'version') {
    console.log(pkg.version);
  }
}
