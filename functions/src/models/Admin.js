const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'Administradores'

class Admin {
    constructor ( datos = {} ) {
        const { 
            uid, 
            esPropietario, 
            funciones 
        } = datos

        this.uid = uid ? uid : ''
        this.esPropietario = esPropietario ? esPropietario : false
        this.funciones = funciones ? funciones : []
    }

    getAdmin () {
        return {
            uid: this.uid,
            esPropietario: this.esPropietario,
            funciones: this.funciones,
        }
    }
    
    setAdmin ( datos = {} ) {
        const { 
            uid, 
            esPropietario, 
            funciones 
        } = datos

        this.setUid(uid)
        this.setEsPropietario(esPropietario)
        this.setFunciones(funciones)
    }

    setUid ( uid = '' ) {
        this.uid = uid
    }

    setEsPropietario ( esPropietario = false ) {
        this.esPropietario = esPropietario
    }

    setFunciones ( funciones = [] ) {
        this.funciones = funciones
    }



    static async crearAdmin ( admin = new Admin() ) {
        await db.collection(COLECCION).doc(admin.uid).set(admin.getAdmin())
    }

    static async obtenerAdminPorUID ( uid = '' ) {
        
        let doc = await db.collection(COLECCION).doc(uid).get()

        if (!doc.exists) return null

        const admin = new Admin(doc.data())

        return admin
    }

    static async actalizarAdminPorUID ( uid = '', datosActualizados = {} ) {
        let existe = !!Object.keys(datosActualizados).length
        
        if (existe) 
            await db.collection(COLECCION).doc(uid).update(datosActualizados)
    }

    static async eliminarAdminPorUID ( uid = '' ) {
        await db.collection(COLECCION).doc(uid).delete()
    }
}

module.exports = Admin