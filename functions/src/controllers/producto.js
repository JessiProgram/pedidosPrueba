
const admin = require('../../firebase-service')
const Producto = require("../models/Producto")

const controller = {}

controller.crearProducto = async (req, res) => {
    try {
        const { body } = req
        const { datosProducto } = body


        const producto = new Producto(datosProducto)

        Producto.agregarProducto(producto)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el producto de forma correcta.',
            resultado: producto.getDatosProducto()
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el producto.',
            resultado: error,
        })
    }
}

controller.leerProducto = async (req, res) => {
    try {
        const { body } = req
        const { uid } = body

        const producto = await Producto.obtenerProductoPorUID(uid)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se obtuvo el producto de forma correcta.',
            resultado: producto.getDatosProducto(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al obtener el producto.',
            resultado: error,
        })
    }
}

controller.actualizarProducto = async (req, res) => {
    try {
        const { body } = req
        const { uid, datosActualizados } = body

        const actualizadoCorrecto = Producto.actualizarProducto(uid, datosActualizados)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se actualizó el producto de forma correcta.',
            resultado: uid,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al actualizar el producto.',
            resultado: error,
        })
    }
}

controller.eliminarProducto = async (req, res) => {
    try {
        const { body } = req
        const { uid } = body

        const producto = await Producto.eliminarProducto(uid)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se eliminó el producto de forma correcta.',
            resultado: uid,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al eliminar el producto.',
            resultado: error,
        })
    }
}

module.exports = controller