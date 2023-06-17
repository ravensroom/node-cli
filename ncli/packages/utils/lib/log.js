const log = require('npmlog');
const debug = require('./debug');

if (debug()) log.level = 'verbose';
else {
  log.level = 'info';
}

log.heading = 'ncli';
log.addLevel('success', 2000, { fg: 'green', bg: 'red', bold: true });

module.exports = log;
