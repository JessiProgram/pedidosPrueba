const { Router } = require('express')
const router = Router()

const controllerUsuario = require('../controllers/usuario')

router.post('/crearUsuario', controllerUsuario.crearUsuario)

module.exports = router