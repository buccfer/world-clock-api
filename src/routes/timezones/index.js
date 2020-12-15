'use strict'

const { Router } = require('express')

const router = Router()

router.get('/')
router.get('/:name')
router.put('/:name')
router.delete('/:name')

module.exports = router
