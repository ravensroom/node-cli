const log = require('npmlog');

if (process.argv.includes('--debug' || process.argv.includes('-d'))) {
  log.level = 'verbose';
} else {
  log.level = 'info';
}

log.heading = 'ncli';
log.addLevel('success', 2000, { fg: 'green', bg: 'red', bold: true });

module.exports = log;
