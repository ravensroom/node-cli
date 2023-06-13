#!/usr/bin/env node
// import chalk from 'chalk';
'use strict';

import ansiStyles from '/home/raven/project/node-cli/test/chalk-test/node_modules/chalk/source/vendor/ansi-styles/index.js';
import supportsColor from '/home/raven/project/node-cli/test/chalk-test/node_modules/chalk/source/vendor/supports-color/index.js';
const { stdout: stdoutColor, stderr: stderrColor } = supportsColor;

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');
// ansi
// console.log('\x1b[31mhello world\x1b[39m mommy');
// console.log('\u001b[31mhello world\u001b[39m mommy');

// by chalk
// ansi escape sequence definition
// console.log(chalk.red.bold('hello'));

// special characters
// console.log('\x1b[31mhello\nworld\x1b[39m mommy');
// console.log('\x1b[31mhello\x1b[39m\n\x1b[31mworld\x1b[39m mommy');
const applyOptions = (object, options = {}) => {
  if (
    options.level &&
    !(
      Number.isInteger(options.level) &&
      options.level >= 0 &&
      options.level <= 3
    )
  ) {
    throw new Error('The `level` option should be an integer from 0 to 3');
  }

  // Detect level if not set manually
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === undefined ? colorLevel : options.level;
};

export class Chalk {
  constructor(options) {
    // eslint-disable-next-line no-constructor-return
    return chalkFactory(options);
  }
}

const chalkFactory = (options) => {
  const chalk = (...strings) => strings.join(' ');
  applyOptions(chalk, options);
  console.log(createChalk.prototype);
  Object.setPrototypeOf(chalk, createChalk.prototype);

  return chalk;
};

function createChalk(options) {
  // this inherits from styles
  return chalkFactory(options);
}

Object.setPrototypeOf(createChalk.prototype, Function.prototype);

const styles = Object.create(null);

for (const [styleName, style] of Object.entries(ansiStyles)) {
  styles[styleName] = {
    get() {
      console.log('get called!', this);
      // throw new Error();
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this[STYLER]),
        this[IS_EMPTY]
      );

      //Object.defineProperty(this, styleName, { value: builder });
      return builder;
    },
  };
}

const createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === undefined) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }

  return {
    open,
    close,
    openAll,
    closeAll,
    parent,
  };
};

const createBuilder = (self, _styler, _isEmpty) => {
  const proto = Object.defineProperties(() => {}, {
    ...styles,
    level: {
      enumerable: true,
      get() {
        return this[GENERATOR].level;
      },
      set(level) {
        this[GENERATOR].level = level;
      },
    },
  });
  // Single argument is hot path, implicit coercion is faster than anything
  // eslint-disable-next-line no-implicit-coercion
  const builder = (...arguments_) =>
    applyStyle(
      builder,
      arguments_.length === 1 ? '' + arguments_[0] : arguments_.join(' ')
    );

  // We alter the prototype because we must return a function, but there is
  // no way to create a function with a different prototype
  Object.setPrototypeOf(builder, proto);

  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;

  return builder;
};

const applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? '' : string;
  }

  let styler = self[STYLER];

  if (styler === undefined) {
    return string;
  }

  const { openAll, closeAll } = styler;
  if (string.includes('\u001B')) {
    while (styler !== undefined) {
      // Replace any instances already present with a re-opening code
      // otherwise only the part of the string until said closing code
      // will be colored, and the rest will simply be 'plain'.
      string = stringReplaceAll(string, styler.close, styler.open);

      styler = styler.parent;
    }
  }

  // We can move both next actions out of loop, because remaining actions in loop won't have
  // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
  // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
  const lfIndex = string.indexOf('\n');
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }

  return openAll + string + closeAll;
};

Object.defineProperties(createChalk.prototype, styles);
console.log(Object.getPrototypeOf(createChalk));
const chalk = createChalk();

console.log(chalk.red('sttt'));
