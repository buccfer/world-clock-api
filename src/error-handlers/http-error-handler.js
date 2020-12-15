'use strict'

const httpStatus = require('http-status')
const defaultTo = require('lodash/defaultTo')
const logger = require('../logger')

// eslint-disable-next-line no-unused-vars
module.exports = function httpErrorHandler(err, req, res, next) {
  const statusCode = defaultTo(err.status, httpStatus.INTERNAL_SERVER_ERROR)
  const errorMessage = err.message && err.expose ? err.message : httpStatus[statusCode]

  if (statusCode >= httpStatus.INTERNAL_SERVER_ERROR) {
    logger.error('Request error: %o', err)
  }

  res.status(statusCode).json({
    statusCode,
    errorMessage
  })
}
