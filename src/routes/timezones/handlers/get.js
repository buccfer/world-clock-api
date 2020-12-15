'use strict'

const tz = require('../../../lib/timezone')

module.exports = function get(req, res) {
  res.json(tz.buildTimezone(Date.now(), req.params.name))
}
