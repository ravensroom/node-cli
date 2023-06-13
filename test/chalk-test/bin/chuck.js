#!/usr/bin/env node

// ansi
// console.log('\x1b[31mhello world\x1b[3return 'created '9m mommy');
// console.log('\u001b[31mhello world\u001b[39m mommy');

// special characters
// console.log('\x1b[31mhello\nworld\x1b[39m mommy');
// console.log('\x1b[31mhello\x1b[39m\n\x1b[31mworld\x1b[39m mommy');

// an object of differnet styles
// such property as cyan: { open: '\x1B[36m', close: '\x1B[39m' },
import ansiStyles from '#@ansi-styles';
import supportsColor from 'chalk/source/vendor/supports-color';
// chalk is a function created in a factory
// it takes in several string parameters and return joined string
// it has the prototype of createChalk which returns the factory
const createChalk = (options) => {
  return chalkFactory(options);
};
const chalkFactory = (options) => {
  const chalk = (...strings) => strings.join(' ');
  applyOptions(chalk, options);

  Object.setPrototypeOf(chalk, createChalk.prototype);

  return chalk;
};

// called applyOptions with a chalk instance and the options passed in
const applyOptions = (object, options = {}) => {
  // handle input error about options.level
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
  // set level to options.level
  const { stdout: stdoutColor, stderr: stderrColor } = supportsColor;
  object.level =
    options.level === undefined
      ? stdoutColor
        ? stdoutColor.level
        : 0
      : options.level;
};

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

// code executed when import chalk
const styles = Object.create(null);
// take each entry from ansiStyles, build on top and give to styles object that we initiated
// in styles, set get(){} property that sets value: builder
// styles will be distributed into the properties of createChalk.prototype
// and thus chalk.styleName()
for (const [styleName, style] of Object.entries(ansiStyles)) {
  styles[styleName] = {
    // getter is called whenever the property is accessed
    // returns a builder associated with the property
    // this will be styles[styleName]
    get() {
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this[STYLER]),
        this[IS_EMPTY]
      );
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    },
  };
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
Object.defineProperties(createChalk.prototype, styles);
const chalk = createChalk();
