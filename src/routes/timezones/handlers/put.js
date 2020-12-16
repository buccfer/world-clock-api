'use strict'

const httpStatus = require('http-status')
const logger = require('../../../logger')

module.exports = function put(req, res) {
  const { name } = req.params

  // Using a database we associate the current user with the given timezone.

  // Tentative Schema
  // user_id -> The current user ID. (PK)
  // timezones -> A set of timezones the user selected.

  // If no record exists for this user, we create it.
  // If there's already a record for this user, we add the timezone to the set (union operation).

  logger.info(`Adding "${name}" as a selected timezone`)
  res.sendStatus(httpStatus.NO_CONTENT)
}
