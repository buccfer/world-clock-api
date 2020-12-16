'use strict'

const { createLogger, transports, format } = require('winston')
const { LOG_LEVEL, NODE_ENV } = require('./config')

module.exports = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()],
  silent: NODE_ENV === 'test'
})
