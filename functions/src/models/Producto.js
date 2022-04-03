
const admin = require('../../firebase-service')
const db = require('../../db')
const DatosPrecio = require('./Utils/DatosPrecio') 

const COLECCION_PRODUCTO = 'Productos'

class Producto {

    constructor (datos = {}) {
        const { 
            uid, 
            nombre, 
            idReferencia,
            descripcion, 
            categoria,
            subCategoria,
            urlImagenes, 
            datosPrecio,
            habilitado
        } = datos

        this.uid = uid ? uid : db.collection(COLECCION_PRODUCTO).doc().id
        this.nombre = nombre ? nombre : ''
        this.idReferencia = idReferencia ? idReferencia : ''
        this.descripcion = descripcion ? descripcion : ''
        this.urlImagenes = urlImagenes ? urlImagenes : []
        this.categoria = categoria ? categoria : ''
        this.subCategoria = subCategoria ? subCategoria : ''
        this.datosPrecio = datosPrecio ? datosPrecio : new DatosPrecio()
        this.habilitado = habilitado !== undefined ? habilitado : false
    }

    getProducto () {
        return {
            uid: this.uid,
            nombre: this.nombre,
            idReferencia: this.idReferencia,
            descripcion: this.descripcion,
            urlImagenes: this.urlImagenes,
            categoria: this.categoria,
            subCategoria: this.subCategoria,
            datosPrecio: this.datosPrecio.getDatosPrecio(),
            habilitado: this.habilitado,
        }
    }

    setProducto (datos) {
        this.setUid(datos.uid)
        this.setNombre(datos.nombre)
        this.setIdReferencia(datos.idReferencia)
        this.setDescripcion(datos.descripcion)
        this.setUrlImagenes(datos.urlImagenes)
        this.setCategoria(datos.categoria)
        this.setSubCategoria(datos.subCategoria)
        this.setDatosPrecio(datos.datosPrecio)
        this.setHabilitado(datos.habilitado)
    }

    setUid (uid = '' ) {
        this.uid = uid
        return this
    }

    setNombre ( nombre = '' ) {
        this.nombre = nombre
        return this
    }

    setIdReferencia ( idReferencia = '' ) {
        this.idReferencia = idReferencia
        return this
    }

    setDescripcion ( descripcion = '' ) {
        this.descripcion = descripcion
        return this
    }

    setUrlImagenes ( urlImagenes = [] ) {
        this.urlImagenes = urlImagenes
        return this
    }

    setCategoria ( categoria = '' ) {
        this.categoria = categoria
        return this
    }

    setSubCategoria ( subCategoria = '' ) {
        this.subCategoria = subCategoria
        return this
    }

    setDatosPrecio ( datosPrecio = new DatosPrecio() ) {
        this.datosPrecio = datosPrecio
        return this
    }

    setHabilitado ( habilitado = false ) {
        this.habilitado = habilitado
        return this
    }

    //
    // METODOS ESTICOS
    //

    static agregarProducto(producto = new Producto()){
        await db.collection(COLECCION_PRODUCTO).doc(producto.uid).set(producto.getDatosProducto())
        return true
    }

    static async obtenerProductoPorUID ( uid = '' ) {

        let productoDoc = await db.collection(COLECCION_PRODUCTO).doc(uid).get()

        if (!productoDoc.exists) return null

        const producto = new Producto(productoDoc.data())

        return producto
    }

    static actualizarProducto(uid = '', datosActualizados = {} ){
        if (datosActualizados) await db.collection(COLECCION_PRODUCTO).doc(uid).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarProducto(uid = ''){
        return await db.collection(COLECCION_PRODUCTO).doc(uid).delete()
    }

}

module.exports = Producto