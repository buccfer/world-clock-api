'use strict'

const tz = require('../../../lib/timezone')

module.exports = async function find(req, res, next) {
  try {
    const now = Date.now()
    const timezones = await tz.getTimezones()

    res.json({
      timezones: timezones.map((timezone) => tz.buildTimezone(now, timezone)),
      total: timezones.length
    })
  } catch (err) {
    next(err)
  }
}
