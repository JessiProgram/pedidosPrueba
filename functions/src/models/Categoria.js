const db = require('../../db')

const COLECCION_CATEGORIA = 'Categorias'

class Categoria {
    constructor (datosCategoria = {}) {
        const { uid, nombre, idReferencia } = datosCategoria
        this.uid = uid ? uid : '' 
        this.idReferencia = idReferencia ? idReferencia : '' 
        this.nombre = nombre ? nombre : '' 
    }

    getDatosCategoria () {
        return {
            uid: this.uid,
            idReferencia: this.idReferencia,
            nombre: this.nombre,
        }
    }

    setDatosCategoria (datosCategoria) {
        this.setUid(datosCategoria.uid)
        this.setIdReferencia(datosCategoria.idReferencia)
        this.setNombre(datosCategoria.nombre)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setIdReferencia ( idReferencia = '' ) {
        this.idReferencia = idReferencia
        return this
    }

    setNombre ( nombre = '' ) {
        this.nombre = nombre
        return this
    }

    //
    // METODOS ESTICOS
    //

    static agregarCategoria(categoria = new Categoria()){
        db.collection(COLECCION_CATEGORIA).doc(categoria.uid).set(categoria.getDatosCategoria())
        return true
    }

    static actualizarCategoria(uid = '', datosActualizados = null ){
        if (datosActualizados) db.collection(COLECCION_CATEGORIA).doc(uid).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarCategoria(uid = ''){
        return await db.collection(COLECCION_CATEGORIA).doc(uid).delete()
    }

}

module.exports = Categoria