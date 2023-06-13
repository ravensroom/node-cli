const o = {
  get val() {
    return 5;
  },
  get() {
    console.log('get called');
    return 'noname get';
  },
};
const proto = {
  name: 'Lily',
  getme() {
    console.log(this);
  },
};
Object.setPrototypeOf(o, proto);
console.log(o.val);
console.log(o.name);
o.getme();

const f = () => {};
Object.defineProperties(f, { red: {}, blue: {} });
const fo = f();
console.log(fo.red);

function bar() {
  var chalk = (s) => `chalk(${s})`;
  Object.setPrototypeOf(chalk, foo.prototype);
  return chalk;
}
function foo() {
  return bar();
}
styles = {
  red: (s) => `red(${s})`,
};

Object.defineProperties(foo.prototype, styles);
