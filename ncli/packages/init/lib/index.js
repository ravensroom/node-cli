const Command = require('@ncli/command');

class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }

  get description() {
    return 'Initialize project';
  }

  get options() {
    return [['-f, --force', 'Force update', false]];
  }

  action([name, opts]) {
    console.log('init', name, opts);
  }

  preAction() {
    console.log('pre');
  }

  postAction() {
    console.log('post');
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;
