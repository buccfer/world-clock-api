'use strict'

const { Router } = require('express')
const { find } = require('./handlers')

const router = Router()

router.get('/', find)

router.get('/:name')

router.put('/:name')

router.delete('/:name')

module.exports = router
