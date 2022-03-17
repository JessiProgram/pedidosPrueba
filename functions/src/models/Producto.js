
const admin = require('../../firebase-service')
const db = require('../../db')
const DatosPrecio = require('./Utils/DatosPrecio') 

const COLECCION_PRODUCTO = 'Productos'

class Producto {

    constructor (datosUsuario = {}) {
        const { uid, nombre, detalles, urlImagenes, datosPrecio} = datosUsuario
        this.uid = uid ? uid : db.collection(COLECCION_PRODUCTO).doc().id
        this.nombre = nombre ? nombre : ''
        this.detalles = detalles ? detalles : ''
        this.urlImagenes = urlImagenes ? urlImagenes : []
        this.datosPrecio = datosPrecio ? datosPrecio : new DatosPrecio()
    }

    getDatosProducto () {
        return {
            uid: this.uid,
            nombre: this.nombre,
            detalles: this.detalles,
            urlImagenes: this.urlImagenes,
        }
    }

    setDatosUsuario (datosUsuario) {
        this.setUid(datosUsuario.uid)
        this.setNombre(datosUsuario.nombre)
        this.setDetalles(datosUsuario.detalles)
        this.setUrlImagenes(datosUsuario.urlImagenes)
        this.setDatosPrecio(datosUsuario.datosPrecio)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setNombre ( nombre = '' ) {
        this.nombre = nombre
        return this
    }

    setCosto ( costo = 0 ) {
        this.costo = costo
        return this
    }

    setDetalles ( detalles = '') {
        this.detalles = detalles
        return this
    }

    setUrlImagenes ( urlImagenes = []) {
        this.urlImagenes = urlImagenes
        return this
    }

    setDatosPrecio ( datosPrecio = new DatosPrecio()) {
        this.datosPrecio = datosPrecio
        return this
    }

    //
    // METODOS ESTICOS
    //

    static agregarProducto(producto = new Producto()){
        db.collection(COLECCION_PRODUCTO).doc(producto.uid).set(producto.getDatosProducto())
        return true
    }

    static async obtenerProductoPorUID ( uid = '' ) {

        let productoDoc = await db.collection(COLECCION_PRODUCTO).doc(uid).get()
        const producto = new Producto(productoDoc.data())

        return producto
    }

    static actualizarProducto(uid = '', datosActualizados = null ){
        if (datosActualizados) db.collection(COLECCION_PRODUCTO).doc(uid).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarProducto(uid = ''){
        return await db.collection(COLECCION_PRODUCTO).doc(uid).delete()
    }

}

module.exports = Producto