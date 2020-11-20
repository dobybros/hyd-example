const log4js = require('log4js')
const path = require('path')
const {app} = require('electron')
log4js.configure({
  appenders: {
    log: {
      type: 'dateFile',
      filename: path.resolve(app.getPath('userData'), 'logs', 'tc-class-client.log'),
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m',
      }
    }
  },
  categories: {
    default: {
      appenders: ['log'],
      level: 'debug'
    }
  }
})

function logger(filename) {
  const logger = log4js.getLogger('log')
  return {
    debug() {
      logger.debug.call(logger, `[ ${path.relative(app.getAppPath(), filename)} ]`, ...arguments)
      // debug('[ ' + +' | debug ]').call(null, ...arguments)
    },
    info() {
      logger.info.call(logger, `[ ${path.relative(app.getAppPath(), filename)} ]`, ...arguments)
    },
    warn() {
      logger.warn.call(logger, `[ ${path.relative(app.getAppPath(), filename)} ]`, ...arguments)
    },
    error() {
      logger.error.call(logger, `[ ${path.relative(app.getAppPath(), filename)} ]`, ...arguments)
    },
    fatal() {
      logger.fatal.call(logger, `[ ${path.relative(app.getAppPath(), filename)} ]`, ...arguments)
    }
  }
}

module.exports = logger
