import EventEmitter from 'events';
import { stdin, stdout } from 'process';
import MuteStream from 'mute-stream';
import readline from 'readline';
import { fromEvent } from 'rxjs';
import ansiEscapes from 'ansi-escapes';

const options = {
  type: 'list',
  name: 'framework',
  message: 'Please choose the frontend framework you want to use: ',
  default: 0,
  choices: [
    {
      value: 1,
      name: 'React',
    },
    {
      value: 2,
      name: 'Vue',
    },
    {
      value: 3,
      name: 'Angular',
    },
  ],
};

function prompt(options) {
  return new Promise((resolve, reject) => {
    try {
      const list = new List(options);
      list.render();
      list.on('exit', (answer) => {
        console.log('Your choice: ', answer.name);
      });
    } catch (e) {
      reject(e);
    }
  });
}

class List extends EventEmitter {
  constructor(options) {
    super();
    this.name = options.name;
    this.message = options.message;
    this.choices = options.choices;
    this.input = stdin;
    const ms = new MuteStream();
    ms.pipe(stdout);
    this.output = ms;
    this.rl = readline.createInterface({
      input: this.input,
      output: this.output,
    });
    this.selected = options.default;
    this.height = 0;
    this.keypress = fromEvent(this.rl.input, 'keypress').forEach(
      this.onKeyPress
    );
    this.haveSelected = false;
  }

  onKeyPress = (keymap) => {
    const key = keymap[1];
    if (key.name === 'down') {
      this.selected++;
      if (this.selected > this.choices.length - 1) this.selected = 0;
      this.render();
    } else if (key.name === 'up') {
      this.selected--;
      if (this.selected < 0) this.selected = this.choices.length - 1;
      this.render();
    } else if (key.name === 'return') {
      this.haveSelected = true;
      this.render();
      this.close();
      this.emit('exit', this.choices[this.selected]);
    }
  };

  render() {
    this.output.unmute();
    this.clean();
    this.output.write(this.getContent());
    this.output.mute();
  }

  getContent() {
    if (!this.haveSelected) {
      let title =
        '\x1b[32m?\x1b[39m \x1b[1m' +
        this.message +
        '\x1b[22m\x1b[0m\x1b[0m\x1b[2m(Use arrow keys)\x1b[22m\n';

      this.choices.forEach((choice, index) => {
        if (index === this.selected)
          title += '\x1b[36m> ' + choice.name + '\x1b[39m ';
        else title += `  ${choice.name} `;
        if (index !== this.choices.length - 1) title += '\n';
      });

      this.height = this.choices.length + 1;
      return title;
    } else {
      const name = this.choices[this.selected].name;
      let title =
        '\x1b[32m?\x1b[39m \x1b[1m' +
        this.message +
        '\x1b[22m\x1b[0m\x1b[36m' +
        name +
        '\x1b[39m\x1b[0m \n';
      return title;
    }
  }

  clean() {
    const emptyLines = ansiEscapes.eraseLines(this.height);
    this.output.write(emptyLines);
  }

  close() {
    this.output.unmute();
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}

prompt(options).then((answer) => console.log(answer));
