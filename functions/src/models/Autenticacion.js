const config = require('../../../config')
const admin = require('../../../firebase-service')
const Usuario = require('./Usuario')
const db = require('../../../db')

const COLECCION_USUARIO = 'Usuarios'

class Authentication {
    constructor ( uid = '' ) {
        this.uid = uid
    }


    /* 
     *    ################################
     *           METODOS NO ESTATICOS
     *    ################################
    */

    async crear ( usuario = new Usuario(), contrasenha = '' ) {
        // Crear una autenticacion para el nuevo usuario
        const usuarioAuthNuevo = await admin.auth().createUser({
            email: usuario.correo,
            password: contrasenha,
            displayName: usuario.nombreCompleto,
        })

        // Crear los reclamos de autenticacion para el nuevo usuario
        admin.auth().setCustomUserClaims(usuarioAuthNuevo.uid, {
            rol: usuario.rol,
        })

        this.uid = usuarioAuthNuevo.uid

        return usuarioAuthNuevo.uid
    }
    
    async obtener () {
        // Recolectamos los datos de firebase authentication
        return await admin.auth().getUser(this.uid)
    }

    async actualizar (datosActualizados = {}) {
        const { auth, claims } = datosActualizados
        
        if (auth) await admin.auth().updateUser(this.uid, auth)
        if (claims) await admin.auth().setCustomUserClaims(this.uid, claims)

        return this
    }

    async actualizarContrasenha ( contrasenha ) {
        return admin.auth().updateUser(this.uid, { password: contrasenha })
    }

    async habilitar ( habilitar ) {
        return await admin.auth().updateUser(this.uid, { disabled: !habilitar })
    }

    async eliminarUsuario (  ) {
        await admin.auth().deleteUser( this.uid )
        return this
    }

    
    /* 
     *    ################################
     *           METODOS ESTATICOS
     *    ################################
    */
    
    static async existeUsuario ( identificadores ) {

        const { uid, nombreCompleto, correo } = identificadores

        if ( uid ) {
            try {
                await admin.auth().getUser(uid)
                return true
            } catch (error) {
                return false
            }
        }

        if ( nombreCompleto ) {
            const docs = await db.collection(COLECCION_USUARIO).where('nombreCompleto', '==', nombreCompleto).get()
            return !docs.empty
        }

        if ( correo ) {
            try {
                await admin.auth().getUserByEmail( correo )
                return true
            } catch (error) {
                return false
            }
        }
    }
}

module.exports = Authentication