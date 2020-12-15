'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { REQUEST_LOGGER_FORMAT } = require('./config')
const { httpErrorHandler } = require('./error-handlers')
const router = require('./routes')

const app = express()

app.use(morgan(REQUEST_LOGGER_FORMAT))
app.use(helmet())
app.use('/', router)
app.use(httpErrorHandler)

module.exports = app
