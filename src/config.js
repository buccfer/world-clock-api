'use strict'

const defaultTo = require('lodash/defaultTo')
const parseInt = require('lodash/parseInt')

const {
  NODE_ENV,
  PORT,
  LOG_LEVEL,
  REQUEST_LOGGER_FORMAT,
  TIMEZONES_API_URL
} = process.env

module.exports = {
  NODE_ENV: defaultTo(NODE_ENV, 'development'),
  PORT: defaultTo(parseInt(PORT), 3000),
  LOG_LEVEL: defaultTo(LOG_LEVEL, 'info'),
  REQUEST_LOGGER_FORMAT: defaultTo(REQUEST_LOGGER_FORMAT, 'dev'),
  TIMEZONES_API_URL: defaultTo(TIMEZONES_API_URL, 'http://worldtimeapi.org/api/timezone')
}
