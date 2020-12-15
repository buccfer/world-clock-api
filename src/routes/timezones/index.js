'use strict'

const { Router } = require('express')
const { checkTimezoneExists } = require('./middlewares')
const { find, get, put } = require('./handlers')

const router = Router()

router.get('/', find)
router.get('/:name(*)', checkTimezoneExists, get)
router.put('/:name(*)', checkTimezoneExists, put)

router.delete('/:name')

module.exports = router
