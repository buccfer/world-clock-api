'use strict'

const httpStatus = require('http-status')
const defaultTo = require('lodash/defaultTo')
const logger = require('../logger')

// eslint-disable-next-line no-unused-vars
module.exports = function httpErrorHandler(err, req, res, next) {
  const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR
  const statusCode = defaultTo(err.statusCode, defaultStatusCode)
  const errorMessage = err.message && err.expose ? err.message : httpStatus[defaultStatusCode]

  if (statusCode === defaultStatusCode) {
    logger.error('Request error: %o', err)
  }

  res.status(statusCode).json({
    statusCode,
    errorMessage
  })
}
