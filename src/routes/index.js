'use strict'

const { Router } = require('express')
const createError = require('http-errors')
const httpStatus = require('http-status')

const router = Router()

router.use((req, res, next) => {
  next(createError(httpStatus.NOT_FOUND, 'Resource not found'))
})

module.exports = router
