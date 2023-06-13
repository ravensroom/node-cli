// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('Your name: ', (answer) => {
//   console.log(answer);
//   rl.close();
// });

import { stdin, stdout } from 'process';

// process.stdout.write('Enter some text: ');
// stdin.on('keypress', function (key) {
//   process.stdout.write(`You pressed: ${key}`);
// });
// // emit keydown events upon new user input data by calling stdin.emit
// stdin.on('data', function (input) {
//   console.log('new input!');
//   stdin.emit('keypress', input);
// });

// stdin.emit('keypress', 'A');

function readline(cb) {
  let line = '';
  // set to manually handle all sorts of inputs
  stdin.setRawMode(true);
  stdin.resume();

  // emit keypress events upon user input
  emitKeypressEvents(stdin);
  // register an event listener for 'keypress' event on process.stdin(a readable stream)
  stdin.on('keypress', function (s) {
    //stdout.write(s);
    line += s;
    console.log(s);
    switch (s) {
      case '\r':
        stdin.pause();
        cb(line);
        break;
      case '\b':
        // stdin.pause();
        stdout.write('no backwards');
        break;
    }
  });
}

function emitKeypressEvents(stream) {
  const g = emitKeys(stream);
  g.next();

  // upon receiving user input data, pass it to generator to emit the accodring keydown event
  stream.on('data', function (chunk) {
    g.next(chunk.toString());
  });
}

function* emitKeys(stream) {
  while (true) {
    let ch = yield;
    stream.emit('keypress', ch);
  }
}

readline(function (s) {
  console.log('Answer:', s);
});
