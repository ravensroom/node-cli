const stream = process.stdout;

stream.cursorTo(0);
let x = 0;
let y = 0;
setInterval(() => {
  stream.moveCursor(++x, ++y);
}, 1000);
