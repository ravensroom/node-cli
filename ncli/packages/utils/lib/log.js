import log from 'npmlog';
import debug from './debug.js';

if (debug()) {
  log.level = 'verbose';
} else {
  log.level = 'info';
}

log.heading = 'ncli';
log.addLevel('success', 2000, { fg: 'green', bg: 'red', bold: true });

export default log;
