'use strict'

const superagent = require('superagent')
const moment = require('moment-timezone')
const { TIMEZONES_API_URL } = require('../config')

async function getTimezones() {
  const { body: timezones } = await superagent.get(TIMEZONES_API_URL)
  return timezones
}

function buildTimezone(date, timezone) {
  return {
    name: timezone,
    localTime: moment(date).tz(timezone).format('DD/MM/yyyy h:mma')
  }
}

module.exports = {
  getTimezones,
  buildTimezone
}
