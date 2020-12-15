'use strict'

const { Router } = require('express')
const { find, get } = require('./handlers')

const router = Router()

router.get('/', find)
router.get('/:name(*)', get)

router.put('/:name')

router.delete('/:name')

module.exports = router
