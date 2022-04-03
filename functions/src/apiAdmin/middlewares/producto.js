const { request, response } = require("express")
const Producto = require("../../models/Producto")

const middleware = {}


middleware.validarExistenciaProducto = async (req = request, res = response, next) => {
    const { otrosDatos, body, params } = req
    const { uidSolicitante, datosAuthSolicitante } = otrosDatos

    try {
        const uidProducto = params.uidProducto

        const producto = await Producto.obtenerProductoPorUID(uidProducto)

        if (!producto) throw new Error('No existe el producto.')

        req.otrosDatos.producto = producto

        next()
    } catch (error) {
        next(error)
    }
}



middleware.validarDatosProductoCreacion = async (req = request, res = response, next) => {
    const { otrosDatos, body } = req
    const { uidSolicitante, datosAuthSolicitante } = otrosDatos
    const { nombre, idReferencia, descripcion, categoria, subCategoria, datosPrecio } = body

    try {
        // Datos Requeridos
        if (!nombre || !idReferencia || !descripcion || !categoria || !subCategoria || ( !datosPrecio || !datosPrecio.precio || datosPrecio.porcentajeDescuento )) 
            throw new Error('No existen los datos necesarios.')
            

        // Tipos de datos
        if (typeof nombre !== 'string') 
            throw new Error('El nombre debe ser un texto.')

        if (typeof idReferencia !== 'string') 
            throw new Error('La ID Referencia debe ser un texto.')
        
        if (typeof descripcion !== 'string') 
            throw new Error('La descripción debe ser un texto.')

        if (typeof categoria !== 'string') 
            throw new Error('La categoria debe ser un texto.')

        if (typeof subCategoria !== 'string') 
            throw new Error('La sub-categoria debe ser un texto.')

        if (typeof datosPrecio !== 'object') 
            throw new Error('Datos incorrectos para precio de producto.')

        if (typeof datosPrecio.precio !== 'number') 
            throw new Error('El precio debe ser número.')

        if (typeof datosPrecio.porcentajeDescuento !== 'number') 
            throw new Error('El procentaje debe ser un número.')

        
        // Validacion de datos
        if ( nombre.length === 0 || nombre.length > 60 ) 
            throw new Error('El nombre del producto debe ser hasta 60 caracteres.')

        if ( idReferencia.length === 0 || idReferencia.length > 20 ) 
            throw new Error('La ID Referencia del producto debe ser hasta 20 caracteres.')

        if ( descripcion.length === 0 || descripcion.length > 270 ) 
            throw new Error('La descripción del producto debe ser hasta 270 caracteres.')

        if ( categoria ) {
            
        }

        if ( subCategoria ) {
            
        }

        if ( datosPrecio ) {
            if ( datosPrecio.precio < 0 ) {
                throw new Error('El producto debe tener un precio válido.')
            }
        }


        next()
    } catch (error) {
        next(error)
    }
}



middleware.validarDatosProductoActualizacion = async (req = request, res = response, next) => {
    const { otrosDatos, body, params } = req
    const { uidSolicitante, datosAuthSolicitante } = otrosDatos
    const { datosActualizados } = body
    const { nombre, idReferencia, descripcion, categoria, subCategoria, datosPrecio } = datosActualizados

    try {
        // Tipos de datos
        if (nombre && typeof nombre !== 'string') 
            throw new Error('El nombre debe ser un texto.')

        if (idReferencia && typeof idReferencia !== 'string') 
            throw new Error('La ID Referencia debe ser un texto.')
        
        if (descripcion && typeof descripcion !== 'string') 
            throw new Error('La descripción debe ser un texto.')

        if (categoria && typeof categoria !== 'string') 
            throw new Error('La categoria debe ser un texto.')

        if (subCategoria && typeof subCategoria !== 'string') 
            throw new Error('La sub-categoria debe ser un texto.')


        // Validacion de datos
        if ( nombre && (nombre.length === 0 || nombre.length > 60) ) 
            throw new Error('El nombre del producto debe ser hasta 60 caracteres.')

        if ( idReferencia && (idReferencia.length === 0 || idReferencia.length > 20) ) 
            throw new Error('La ID Referencia del producto debe ser hasta 20 caracteres.')

        if ( descripcion && (descripcion.length === 0 || descripcion.length > 270) ) 
            throw new Error('La descripción del producto debe ser hasta 270 caracteres.')

        if ( categoria ) {
            
        }

        if ( subCategoria ) {
            
        }

        if ( datosPrecio ) {
            if ( datosPrecio.precio < 0 ) {
                throw new Error('El producto debe tener un precio válido.')
            }
        }
        
        next()
    } catch (error) {
        next(error)
    }
}



middleware.construirDatosProductoCreacion = async (req = request, res = response, next) => {
    const { otrosDatos, body } = req
    const { uidSolicitante, datosAuthSolicitante } = otrosDatos
    const { nombre, idReferencia, descripcion, categoria, subCategoria, datosPrecio } = body

    try {
        
        req.body.nombre = nombre.trim()
        req.body.idReferencia = idReferencia.trim()
        req.body.descripcion = descripcion.trim()
        req.body.categoria = categoria.trim()
        req.body.subCategoria = subCategoria.trim()
        req.body.datosPrecio.precio = datosPrecio.precio
        req.body.datosPrecio.porcentajeDescuento = datosPrecio.porcentajeDescuento

        next()
    } catch (error) {
        next(error)
    }
}



middleware.construirDatosProductoActualizacion = async (req = request, res = response, next) => {
    const { otrosDatos, body, params } = req
    const { uidSolicitante, datosAuthSolicitante } = otrosDatos
    const { datosActualizados } = body
    const { nombre, idReferencia, descripcion, categoria, subCategoria, datosPrecio } = datosActualizados

    try {
        
        nombre ? req.body.datosActualizados.nombre = nombre.trim() : ''
        idReferencia ? req.body.datosActualizados.idReferencia = idReferencia.trim() : ''
        descripcion ? req.body.datosActualizados.descripcion = descripcion.trim() : ''
        categoria ? req.body.datosActualizados.categoria = categoria.trim() : ''
        subCategoria ? req.body.datosActualizados.subCategoria = subCategoria.trim() : ''
        datosPrecio ? req.body.datosActualizados.datosPrecio = {
            precio: datosPrecio.precio,
            porcentajeDescuento: datosPrecio.porcentajeDescuento,
        } : ''

        next()
    } catch (error) {
        next(error)
    }
}



middleware.validarDatosHabilitacion = async (req = request, res = response, next) => {
    const { otrosDatos, body, params } = req
    const { uidSolicitante, datosAuthSolicitante, producto } = otrosDatos
    const { habilitar } = body

    try {
        // DATOS REQUERIDOS
        if (habilitar === undefined) 
            throw new Error('Datos invalidos.')

        // TIPOS DE DATOS
        if (typeof habilitar !== 'boolean') 
            throw new Error('Datos invalidos.')
        
        // VALIDACION DE DATOS
        if (producto.habilitado && producto.habilitado === habilitar) {
            throw new Error('El producto ya esta habilitado.')
        } else if (!producto.habilitado && producto.habilitado === habilitar) {
            throw new Error('El producto ya esta deshabilitado.')
        }

        next()
    } catch (error) {
        next(error)
    }
}



module.exports = middleware