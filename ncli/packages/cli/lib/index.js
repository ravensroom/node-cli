import createInitCommand from '@ncli/init';
import { log, debug } from '@ncli/utils';
import createCLI from './createCLI.js';

process.on('uncaughtException', (e) => {
  if (debug()) {
    log.error(e);
  } else {
    log.error(e.message);
  }
});

function cli(args) {
  const program = createCLI();
  createInitCommand(program);

  program.parse(process.argv);
}

export default cli;
