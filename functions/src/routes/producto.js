const { Router } = require('express')
const router = Router()

const controllerProducto = require('../controllers/producto')

router.post('/crearProducto', controllerProducto.crearProducto)
router.post('/leerProducto/:uid', controllerProducto.leerProducto)
router.put('/actualizarProducto/:uid', controllerProducto.actualizarProducto)
router.delete('/eliminarProducto/:uid', controllerProducto.eliminarProducto)

module.exports = router
