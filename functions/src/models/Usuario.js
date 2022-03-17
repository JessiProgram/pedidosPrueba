const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION_USUARIO = 'Usuarios'

class Usuario {

    constructor (datosUsuario = {}) {
        const { uid, nombreCompleto, correo, cedula, ciudad, fechaNacimiento, datosUbicacion,
            datosTelefono, rol} = datosUsuario
        this.uid = uid ? uid : db.collection(COLECCION_USUARIO).doc().id
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.correo = correo ? correo : ''
        this.cedula = cedula ? cedula : ''
        this.ciudad = ciudad ? ciudad : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.datosUbicacion = datosUbicacion ? datosUbicacion : []
        this.datosTelefono = datosTelefono ? datosTelefono : []
        this.rol = rol ? rol : ''
    }

    getDatosUsuario () {
        return {
            uid: this.uid,
            nombreCompleto: this.nombreCompleto,
            correo: this.correo,
            cedula: this.cedula,
            ciudad: this.ciudad,
            fechaNacimiento: this.fechaNacimiento,
            datosUbicacion: this.datosUbicacion,
            datosTelefono: this.datosTelefono,
            rol: this.rol,
        }
    }

    setDatosUsuario (datosUsuario) {
        this.setUid(datosUsuario.uid)
        this.setNombreCompleto(datosUsuario.nombreCompleto)
        this.setCorreo(datosUsuario.correo)
        this.setCedula(datosUsuario.cedula)
        this.setCiudad(datosUsuario.ciudad)
        this.setFechaNacimiento(datosUsuario.fechaNacimiento)
        this.setDatosUbicacion(datosUsuario.datosUbicacion)
        this.setDatosTelefono(datosUsuario.datosTelefono)
        this.setRol(datosUsuario.rol)
    }

    setUid (uid = '') {
        this.uid = uid
        return this
    }

    setNombreCompleto ( nombreCompleto = '' ) {
        this.nombreCompleto = nombreCompleto
        return this
    }

    setCorreo (correo = '') {
        this.correo = correo
        return this
    }

    setCedula ( cedula = '' ) {
        this.cedula = cedula
        return this
    }

    setCiudad ( ciudad = '') {
        this.ciudad = ciudad
        return this
    }

    setFechaNacimiento ( fechaNacimiento = null) {
        this.fechaNacimiento = fechaNacimiento
        return this
    }

    setDatosUbicacion ( datosUbicacion = []) {
        this.datosUbicacion = datosUbicacion
        return this
    }

    setDatosTelefono ( datosTelefono = []) {
        this.datosTelefono = datosTelefono
        return this
    }

    setRol ( rol = '') {
        this.rol = rol
        return this
    }

    /**
     * Metodos Estaticos
    */
     static async crearUsuario ( usuario = new Usuario() ) {
        // Crear los datos en firestore para el nuevo usuario
        db.collection(COLECCION_USUARIO).doc(usuario.uid).set(usuario.getDatosUsuario())

        return true
    }

    static async obtenerUsuarioPorUID ( uid = '' ) {
        
        let usuarioDoc = await db.collection(COLECCION_USUARIO).doc(uid).get()
        const usuario = new Usuario(usuarioDoc.data())

        return usuario
    }

    static async actalizarUsuarioPorUID ( uidUsuario = '', datosActualizados = null ) {
        // Actualizar los datos de firestore del usuario
        if (datosActualizados) db.collection(COLECCION_USUARIO).doc(uidUsuario).update(datosActualizados)
        return !!datosActualizados 
    }

    static async eliminarUsuarioPorUID ( uidUsuario = '' ) {
        return await db.collection(COLECCION_USUARIO).doc(uidUsuario).delete()
    }
}

module.exports = Usuario