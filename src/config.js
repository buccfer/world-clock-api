'use strict'

const defaultTo = require('lodash/defaultTo')
const parseInt = require('lodash/parseInt')

const {
  NODE_ENV,
  PORT,
  LOG_LEVEL,
  REQUEST_LOGGER_FORMAT,
  TIMEZONES_API_URL,
  CORS_ALLOWED_ORIGIN,
  REDIS_URL,
  TIMEZONES_CACHE_EXPIRATION_IN_SECONDS
} = process.env

module.exports = {
  NODE_ENV: defaultTo(NODE_ENV, 'development'),
  PORT: defaultTo(parseInt(PORT), 5000),
  LOG_LEVEL: defaultTo(LOG_LEVEL, 'info'),
  REQUEST_LOGGER_FORMAT: defaultTo(REQUEST_LOGGER_FORMAT, 'dev'),
  TIMEZONES_API_URL: defaultTo(TIMEZONES_API_URL, 'http://worldtimeapi.org/api/timezone'),
  CORS_ALLOWED_ORIGIN: defaultTo(CORS_ALLOWED_ORIGIN, 'http://localhost:3000'),
  REDIS_URL: defaultTo(REDIS_URL, 'redis://redis'),
  TIMEZONES_CACHE_EXPIRATION_IN_SECONDS: defaultTo(parseInt(TIMEZONES_CACHE_EXPIRATION_IN_SECONDS), 86400)
}
