import path from 'node:path';
import { execa } from 'execa';

const CLI = path.join(__dirname, '../bin/cli.js');
const bin =
  () =>
  (...args) =>
    execa(CLI, args);

test('run bad command', async () => {
  const { stderr } = await bin()('bad-command');
  expect(stderr).toContain('Unknown command: bad-command');
});

test('should not throw error when using --help', async () => {
  let error = null;
  try {
    await bin()('--help');
  } catch (e) {
    error = e;
  }
  expect(error).toBe(null);
});

test('show correct version', async () => {
  const { stdout } = await bin()('-V');
  expect(stdout).toContain(require('../package.json').version);
});

test('launch debug mode', async () => {
  let error = null;
  try {
    await bin()('--debug');
  } catch (e) {
    error = e;
  }
  expect(error.message).toContain('launch debug mode');
});
