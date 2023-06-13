// import { BufferListStream } from 'bl';

// =======private members==========
// class Ola {
//   // # is private identifier
//   #name = 'sam';

//   constructor() {}

//   getName() {
//     return this.#name;
//   }
// }

// const o = new Ola();
// console.log(o.getName);

// =====Input listener at loading status, only output after loading is done=======
// const bl = new BufferListStream();
// bl.append(Buffer.from('abcd'));
// bl.append(Buffer.from('efgh'));

// console.log(bl.length);
// console.log(bl.toString());

// =====Hide and show cursor=====
// console.log('\u001B[?25l')
// console.log('\u001B[?25h')

import spinnerJSON from './spinners.json' assert { type: 'json' };
const spinners = Object.assign({}, spinnerJSON);
const spinnersList = Object.keys(spinners);
Object.defineProperty(spinners, 'random', {
  get() {
    const randomIndex = Math.floor(Math.random() * spinnersList.length);
    const spinnerName = spinnersList[randomIndex];
    return spinners[spinnerName];
  },
});

import cliCursor from 'cli-cursor';
import { BufferListStream } from 'bl';
import readline from 'readline';
import logSymbols from 'log-symbols';

const spinner = spinners.pacman;
const text = 'Downloading...';
const stream = process.stderr; // output stream
let frameIndex = 0; // current frame
const frames = spinner.frames; // contents of each frame
const interval = spinner.interval; // intervals between frames

const mutatedStream = new BufferListStream();
mutatedStream.pipe(process.stdout);
const rl = readline.createInterface({
  input: process.stdin,
  output: mutatedStream,
});

const render = () => {
  // frameIndex = ++frameIndex % frames.length;
  if (frameIndex < frames.length) {
    clear();
  } else {
    stop();
    return console.log(logSymbols.success);
  }
  const percentage = Math.round(((frameIndex + 1) / frames.length) * 100);
  const content = frames[frameIndex];
  const textToRender = text + content + ` ${percentage}%`;
  stream.write(textToRender);

  ++frameIndex;
};

const clear = () => {
  stream.cursorTo(0);
  stream.clearLine(1);
};

const stop = () => {
  clearInterval(i);
  i = undefined;
  // clear();
  frameIndex = 0;
  cliCursor.show(stream);
  rl.close();
};

cliCursor.hide(stream);
let i = setInterval(render, interval);
