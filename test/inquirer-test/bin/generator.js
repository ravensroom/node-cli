function* g() {
  console.log('read');
  // next() will execute the function till here,
  // and pass the argument to ch
  let ch = yield;
  console.log(ch);
  let s = yield;
  console.log(s);
}

const f = g();
f.next();
f.next('a');
f.next('b');
