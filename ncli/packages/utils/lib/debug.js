module.exports = function debug() {
  return process.argv.includes('--debug' || process.argv.includes('-d'));
};
