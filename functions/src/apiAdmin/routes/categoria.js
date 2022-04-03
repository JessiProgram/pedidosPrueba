const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../api/middlewares/usuario')
const { esAdmin, esPropietario, validarPermisosParaActualizacionDeRol } = require('../../apiAdmin/middlewares/usuario')
const { actualizarRol } = require('../controllers/usuario')

router.put('/crearCategoria/:uidCategoria', 
    estaAutenticado, 
    esPropietario,
    validarPermisosParaActualizacionDeRol, 
    actualizarRol)

router.put('/actualizarCategoria/:uidCategoria', 
    estaAutenticado, 
    esPropietario,
    validarPermisosParaActualizacionDeRol, 
    actualizarRol)

router.put('/actualizarCategoria/:uidCategoria', 
    estaAutenticado, 
    esPropietario,
    validarPermisosParaActualizacionDeRol, 
    actualizarRol)


module.exports = router