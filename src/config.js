'use strict'

const defaultTo = require('lodash/defaultTo')

const {
  PORT,
  LOG_LEVEL
} = process.env

module.exports = {
  PORT: defaultTo(PORT, 3000),
  LOG_LEVEL: defaultTo(LOG_LEVEL, 'info')
}
