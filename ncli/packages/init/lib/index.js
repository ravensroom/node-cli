import Command from '@ncli/command';
import { log } from '@ncli/utils';

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

export default Init;
