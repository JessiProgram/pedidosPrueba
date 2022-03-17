const { Router } = require('express')
const router = Router()

const controllerUsuario = require('../controllers/usuario')

const { estaAutenticado, esAdmin } = require('../middlewares/usuario')

router.post('/crearUsuario', controllerUsuario.crearUsuario)

router.put('/actualizarRolUsuario/:uid', 
//estaAutenticado, 
//esAdmin, 
controllerUsuario.actualizarRol)


module.exports = router
