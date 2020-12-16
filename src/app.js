'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { REQUEST_LOGGER_FORMAT, CORS_ALLOWED_ORIGIN } = require('./config')
const { httpErrorHandler } = require('./error-handlers')
const router = require('./routes')

const app = express()

app.use(morgan(REQUEST_LOGGER_FORMAT))
app.use(helmet())
app.use(cors({
  origin: CORS_ALLOWED_ORIGIN
}))
app.use('/', router)
app.use(httpErrorHandler)

module.exports = app
