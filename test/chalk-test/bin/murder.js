#!/usr/bin/env node
// import chalk from 'chalk';
'use strict';

import ansiStyles from '/home/raven/project/node-cli/test/chalk-test/node_modules/chalk/source/vendor/ansi-styles/index.js';
import supportsColor from '/home/raven/project/node-cli/test/chalk-test/node_modules/chalk/source/vendor/supports-color/index.js';
const { stdout: stdoutColor, stderr: stderrColor } = supportsColor;

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

export class Chalk {
  constructor(options) {
    // eslint-disable-next-line no-constructor-return
    return chalkFactory(options);
  }
}

const chalkFactory = (options) => {
  const chalk = (...strings) => strings.join(' ');
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
        createStyler(style.open, style.close, this[STYLER])
        //this[IS_EMPTY]
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
  const proto = styles;
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
