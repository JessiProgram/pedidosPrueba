const db = require('../../db')

const COLECCION_CATEGORIA = 'Categorias'
const COLECCION_SUBCATEGORIA = 'SubCategorias'

class SubCategoria {
    constructor (datosSubCategoria = {}) {
        const { uid, idReferencia, nombre, uidCategoria } = datosSubCategoria
        this.uid = uid ? uid : '' 
        this.idReferencia = idReferencia ? idReferencia : '' 
        this.nombre = nombre ? nombre : '' 
        this.uidCategoria = uidCategoria ? uidCategoria : '' 
    }

    getDatosSubCategoria () {
        return {
            uid: this.uid,
            idReferencia: this.idReferencia,
            nombre: this.nombre,
            uidCategoria: this.uidCategoria,
        }
    }

    setDatosSubCategoria (datosSubCategoria) {
        this.setUid(datosSubCategoria.uid)
        this.setIdReferencia(datosSubCategoria.idReferencia)
        this.setNombre(datosSubCategoria.nombre)
        this.setUidCategoria(datosSubCategoria.uidCategoria)
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

    setUidCategoria ( uidCategoria = '' ) {
        this.uidCategoria = uidCategoria
        return this
    }

    //
    // METODOS ESTICOS
    //

    static agregarSubCategoria(subCategoria = new SubCategoria()){
        db.collection(COLECCION_CATEGORIA).doc(subCategoria.uidCategoria)
        .collection(COLECCION_SUBCATEGORIA).doc(subCategoria.uid)
        .set(subCategoria.getDatosCategoria())
        return true
    }

    static actualizarSubCategoria(uidCategoria = '', uidSubCategoria = '', datosActualizados = null ){
        // Cuando cambiamos de categoria
        if (datosActualizados.uidCategoria !== uidCategoria ) {

            datosActualizados.uid = uidSubCategoria

            // Creamos uno nuevo en la nueva categoria
            SubCategoria.agregarSubCategoria(new SubCategoria(datosActualizados))

            // Borramos el actual
            SubCategoria.eliminarSubCategoria(uidCategoria,uidSubCategoria)

        } else {

            // Actualizamos el documento
            db.collection(COLECCION_CATEGORIA).doc(uidCategoria)
            .collection(COLECCION_SUBCATEGORIA).doc(uidSubCategoria)
            .update(datosActualizados)

        }
        return !!datosActualizados 
    }  

    static async eliminarSubCategoria( uidCategoria = '', uidSubCategoria = '' ){
        return await db.collection(COLECCION_CATEGORIA).doc(uidCategoria)
        .collection(COLECCION_SUBCATEGORIA).doc(uidSubCategoria).delete()
    }

}

module.exports = SubCategoria