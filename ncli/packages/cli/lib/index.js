import createInitCommand from '@ncli/init';
import createCLI from './createCLI.js';
import './exception.js';

function cli(args) {
  const program = createCLI();
  createInitCommand(program);

  program.parse(process.argv);
}

export default cli;
