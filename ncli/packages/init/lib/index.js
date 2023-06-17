const Command = require('@ncli/command');
const { log } = require('@ncli/utils');

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
    log.verbose('init', name, opts);
  }

  preAction() {
    log.verbose('pre');
  }

  postAction() {
    log.verbose('post');
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;
