'use strict'

const app = require('./src/app')
const logger = require('./src/logger')
const { PORT } = require('./src/config')

app.listen(PORT, () => {
  logger.info(`API running on port ${PORT}`)
})
