'use strict'

const { createLogger, transports } = require('winston')
const { LOG_LEVEL } = require('./config')

module.exports = createLogger({
  level: LOG_LEVEL,
  transports: [new transports.Console()]
})
