'use strict'

const createError = require('http-errors')
const httpStatus = require('http-status')
const tz = require('../../../lib/timezone')

module.exports = async function checkTimezoneExists(req, res, next) {
  try {
    const { name } = req.params
    const timezones = await tz.getTimezones()

    if (!timezones.includes(name)) {
      return next(createError(httpStatus.NOT_FOUND, `Timezone "${name}" does not exist.`))
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
