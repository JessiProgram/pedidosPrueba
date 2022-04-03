const admin = require('../../firebase-service')
const db = require('../../db')

const COLECCION = 'Roles'

class Rol {
    constructor ( rol = '' ) {
        this.rol = rol ? rol : 'cliente'
    }

    static async obtenerRolPorUID ( uid = '' ) {
        
        let doc = await db.collection(COLECCION).doc(uid).get()

        if (!doc.exists) return null

        const rol = new Rol(doc.data().uid)

        return rol
    }
}

module.exports = Rol