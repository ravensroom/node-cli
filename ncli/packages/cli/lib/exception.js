import { log, debug } from '@ncli/utils';

function printErrorLog(e, type) {
  if (debug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message);
  }
}
process.on('uncaughtException', (e) => printErrorLog(e, 'error'));
process.on('uncaughtRejection', (e) => printErrorLog(e, 'promise'));
