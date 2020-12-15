'use strict'

const express = require('express')
const morgan = require('morgan')
const { REQUEST_LOGGER_FORMAT } = require('./config')

const app = express()

app.use(morgan(REQUEST_LOGGER_FORMAT))

module.exports = app
