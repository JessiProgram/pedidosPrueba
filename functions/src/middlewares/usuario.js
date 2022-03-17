const admin = require('../../firebase-service')
const db = require('../../db')
const getAuthToken = require('../helpers/getAuthToken')

const middlewaresUsuario = {}

middlewaresUsuario.estaAutenticado = (req, res, next) => {

    const myNext = async () => {
        
        try {
            const { authToken } = req.pedidosDatos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.pedidosDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.pedidosDatos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) {
                throw new Error("Usuario deshabilitado")
            }

            return next()
    
        } catch ( error ) {
            console.log('estaAutenticado: ', error)
            next(error)
        }
    }

    getAuthToken(req, res, myNext)
    
}

middlewaresUsuario.esAdmin = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.pedidosDatos
        
        const rol = datosAuthSolicitante.customClaims.rol

        if ( rol !== 'admin' ) {
            // No autorizado
            throw new Error("Usuario no autorizado")
        }
        
        return next()

    } catch ( error ) {
        next(error)

    }

}

module.exports = middlewaresUsuario