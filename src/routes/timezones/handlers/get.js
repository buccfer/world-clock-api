'use strict'

const createError = require('http-errors')
const httpStatus = require('http-status')
const tz = require('../../../lib/timezone')

module.exports = async function get(req, res, next) {
  const { name } = req.params

  try {
    const timezones = await tz.getTimezones()

    if (!timezones.includes(name)) {
      return next(createError(httpStatus.NOT_FOUND, `Timezone ${name} does not exist.`))
    }

    return res.json(tz.buildTimezone(Date.now(), name))
  } catch (err) {
    return next(err)
  }
}
