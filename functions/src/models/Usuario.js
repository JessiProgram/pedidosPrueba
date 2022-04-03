const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'Usuarios'

class Usuario {

    constructor (datosUsuario = {}) {
        const { uid, nombreCompleto, correo, cedula, ciudad, fechaNacimiento, datosTelefono, rol} = datosUsuario

        this.uid = uid ? uid : db.collection(COLECCION).doc().id
        this.nombreCompleto = nombreCompleto ? nombreCompleto : ''
        this.correo = correo ? correo : ''
        this.cedula = cedula ? cedula : ''
        this.ciudad = ciudad ? ciudad : ''
        this.fechaNacimiento = fechaNacimiento ? fechaNacimiento : null
        this.datosTelefono = datosTelefono ? datosTelefono : []
        this.rol = rol ? rol : 'cliente'
    }

    getUsuario () {
        return {
            uid: this.uid,
            nombreCompleto: this.nombreCompleto,
            correo: this.correo,
            cedula: this.cedula,
            ciudad: this.ciudad,
            fechaNacimiento: this.fechaNacimiento,
            datosTelefono: this.datosTelefono,
            rol: this.rol,
        }
    }

    setUsuario (datosUsuario) {
        this.setUid(datosUsuario.uid)
        this.setNombreCompleto(datosUsuario.nombreCompleto)
        this.setCorreo(datosUsuario.correo)
        this.setCedula(datosUsuario.cedula)
        this.setCiudad(datosUsuario.ciudad)
        this.setFechaNacimiento(datosUsuario.fechaNacimiento)
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

    setCiudad ( ciudad = '' ) {
        this.ciudad = ciudad
        return this
    }

    setFechaNacimiento ( fechaNacimiento = null ) {
        this.fechaNacimiento = fechaNacimiento
        return this
    }

    setDatosTelefono ( datosTelefono = [] ) {
        this.datosTelefono = datosTelefono
        return this
    }

    setRol ( rol = 'cliente' ) {
        this.rol = rol
        return this
    }

    /**
     * Metodos Estaticos
    */
    static async crearUsuario ( usuario = new Usuario() ) {
        // Crear los datos en firestore para el nuevo usuario
        db.collection(COLECCION).doc(usuario.uid).set(usuario.getUsuario())

        return true
    }

    static async obtenerUsuarioPorUID ( uid = '' ) {
        
        let usuarioDoc = await db.collection(COLECCION).doc(uid).get()
        const usuario = new Usuario(usuarioDoc.data())

        return usuario
    }

    static async actalizarUsuarioPorUID ( uidUsuario = '', datosActualizados = {} ) {
        // Actualizar los datos de firestore del usuario
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            db.collection(COLECCION).doc(uidUsuario).update(datosActualizados)
        
        return existe
    }

    static async eliminarUsuarioPorUID ( uidUsuario = '' ) {
        return await db.collection(COLECCION).doc(uidUsuario).delete()
    }
}

module.exports = Usuario