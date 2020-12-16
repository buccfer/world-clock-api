'use strict'

const httpStatus = require('http-status')
const logger = require('../../../logger')

module.exports = function remove(req, res) {
  const { name } = req.params

  // If user doesn't have the given timezone selected, then no-op.
  // If the user has the given timezone selected, then we remove it from the timezones set.

  logger.info(`Removing "${name}" from selected timezones`)
  res.sendStatus(httpStatus.NO_CONTENT)
}
