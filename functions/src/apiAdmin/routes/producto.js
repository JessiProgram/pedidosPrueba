const { Router } = require('express')
const router = Router()

const { estaAutenticado } = require('../../api/middlewares/usuario')
const { esAdmin } = require('../../apiAdmin/middlewares/usuario')
const { validarDatosProductoCreacion, validarExistenciaProducto, validarDatosProductoActualizacion, construirDatosProductoActualizacion, construirDatosProductoCreacion, validarDatosHabilitacion } = require('../middlewares/producto')
const {
    crearProducto,
    leerProducto,
    actualizarProducto,
    eliminarProducto,
    habilitarProducto
} = require('../controllers/producto')


// Creación
router.post('/crear', 
    estaAutenticado, 
    esAdmin, 
    validarDatosProductoCreacion,
    construirDatosProductoCreacion,
    crearProducto)


// Obtener
router.post('/leer/:uidProducto', 
    estaAutenticado, 
    esAdmin, 
    validarExistenciaProducto,
    leerProducto)


// Actualización
router.put('/actualizar/:uidProducto', 
    estaAutenticado, 
    esAdmin, 
    validarExistenciaProducto,
    validarDatosProductoActualizacion,
    construirDatosProductoActualizacion,
    actualizarProducto)


// Eliminación
router.delete('/eliminar/:uidProducto', 
    estaAutenticado, 
    esAdmin, 
    validarExistenciaProducto,
    eliminarProducto)


// Habilitación/Deshabilitación
router.put('/habilitar/:uidProducto', 
    estaAutenticado, 
    esAdmin, 
    validarExistenciaProducto,
    validarDatosHabilitacion,
    habilitarProducto)


module.exports = router