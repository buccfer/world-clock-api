'use strict'

const superagent = require('superagent')
const moment = require('moment-timezone')
const { TIMEZONES_API_URL, TIMEZONES_CACHE_EXPIRATION_IN_SECONDS } = require('../config')
const redis = require('./redis')

async function getTimezones() {
  const timezonesKey = 'world_api_timezones'

  const cachedTimezones = await redis.getObjectAsync(timezonesKey)

  if (cachedTimezones) {
    return cachedTimezones
  }

  const { body: timezones } = await superagent.get(TIMEZONES_API_URL)
  await redis.setexObjectAsync(timezonesKey, TIMEZONES_CACHE_EXPIRATION_IN_SECONDS, timezones)

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
