const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller.js')

router.get('/pessoas', controller.pessoas)
router.get('/pessoas/:id', controller.pessoa_id)
router.post('/pessoas', controller.create)
router.put('/pessoas/:id', controller.update)
router.delete('/pessoas/:id', controller.delete)

module.exports = router

// GET /pessoas
// GET /pessoas/id
// POST /pessoas
// PUT /pessoas/id
// DELETE /pessoas/id