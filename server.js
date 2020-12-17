'use strict'

const app = require('./src/app')
const logger = require('./src/logger')
const { PORT, REDIS_URL } = require('./src/config')
const { client: redisClient } = require('./src/lib/redis')

redisClient
  .on('ready', () => {
    logger.info(`Redis running on ${REDIS_URL}`)

    app.listen(PORT, () => {
      logger.info(`API running on port ${PORT}`)
    })
  })
  .on('error', (err) => {
    logger.error('Redis error: %o', err)
    process.exit(1)
  })
