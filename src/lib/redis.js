'use strict'

const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../config')

const client = redis.createClient({ url: REDIS_URL })

function jsonParse(str) {
  try {
    return JSON.parse(str)
  } catch (err) {
    return null
  }
}

function jsonStringify(obj) {
  try {
    return JSON.stringify(obj)
  } catch (err) {
    return null
  }
}

module.exports = {
  client,
  getObjectAsync: (key) => new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(jsonParse(value))
      }
    })
  }),
  setexObjectAsync: (key, exp, obj) => new Promise((resolve, reject) => {
    client.setex(key, exp, jsonStringify(obj), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  }),
  flushallAsync: promisify(client.flushall).bind(client)
}
