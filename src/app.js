'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { REQUEST_LOGGER_FORMAT } = require('./config')

const app = express()

app.use(morgan(REQUEST_LOGGER_FORMAT))
app.use(helmet())

module.exports = app
