
const admin = require('../../../firebase-service')
const Producto = require("../../models/Producto")

const controller = {}



controller.crearProducto = async (req, res) => {
    try {
        const { body } = req
        const { nombre, descripcion, categoria, subCategoria, datosPrecio } = body

        const producto = new Producto({
            nombre, 
            descripcion, 
            categoria, 
            subCategoria, 
            datosPrecio
        })

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
        const { body, params, otrosDatos } = req
        const { uidProducto } = params

        const producto = otrosDatos.producto

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
        const { body, params, otrosDatos } = req
        const { datosActualizados } = body
        const { uidProducto } = params

        Producto.actualizarProducto(uidProducto, datosActualizados)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se actualizó el producto de forma correcta.',
            resultado: uidProducto,
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
        const { body, params, otrosDatos, } = req
        const { uidProducto } = params

        Producto.eliminarProducto(uidProducto)

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se eliminó el producto de forma correcta.',
            resultado: uidProducto,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al eliminar el producto.',
            resultado: error,
        })
    }
}


controller.habilitarProducto = async (req, res) => {
    try {
        const { otrosDatos, body, params } = req
        const { uidSolicitante, datosAuthSolicitante, producto } = otrosDatos
        const { habilitar } = body
        const { uidProducto } = params

        const mensaje = habilitar ? 'Se habilitó el producto.' : 'Se deshabilitó el producto.'
        Producto.actualizarProducto(uidProducto, {
            habilitado: habilitar
        })

        return res.status(200).json({
            codigo: 'exito',
            mensaje: mensaje,
            resultado: uidProducto,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}



module.exports = controller