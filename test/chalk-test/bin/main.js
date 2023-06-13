#!/usr/bin/env node
import chalk, { Chalk } from 'chalk';

console.log(chalk.red('hello') + ' ' + chalk.blue('world'));
console.log(chalk.red.bgGreen.bold('hello'));
console.log(chalk.blue('hello', 'world'));
console.log(chalk.red('hello', chalk.underline('world')));
console.log(chalk.rgb(255, 255, 0)('hello'));
console.log(chalk.rgb(255, 0, 255).underline('hello'));
console.log(chalk.hex('ff0000').bold('hello'));

const error = (...text) => console.log(chalk.bold.hex('ff0000')(text));
const warning = (...text) => console.log(chalk.bold.hex('ffa500')(text));

error('404');
warning('Potential security risks');

/**
Specify the color support for Chalk.

By default, color support is automatically detected based on the environment.

Levels:
- `0` - All colors disabled.
- `1` - Basic 16 colors support.
- `2` - ANSI 256 colors support.
- `3` - Truecolor 16 million colors support.
*/
const customChalk = new Chalk({
  level: 0,
});

console.log(customChalk.red('hello'));
