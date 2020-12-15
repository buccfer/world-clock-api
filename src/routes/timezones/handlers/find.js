'use strict'

const superagent = require('superagent')
const map = require('lodash/map')
const { utcToZonedTime, format } = require('date-fns-tz')
const { TIMEZONES_API_URL } = require('../../../config')

module.exports = async function find(req, res, next) {
  try {
    const now = Date.now()
    const { body: timezones } = await superagent.get(TIMEZONES_API_URL)

    res.json({
      timezones: map(
        timezones,
        (tz) => ({
          name: tz,
          localTime: format(utcToZonedTime(now, tz), 'dd/MM/yyyy h:mma')
        })
      ),
      total: timezones.length
    })
  } catch (err) {
    next(err)
  }
}
