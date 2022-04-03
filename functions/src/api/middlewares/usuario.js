const admin = require('../../firebase-service')
const getAuthToken = require('../helpers/getAuthToken')

const middlewaresUsuario = {}

middlewaresUsuario.estaAutenticado = (req, res, next) => {

    const myNext = async () => {
        
        try {
            const { authToken } = req.otrosDatos

            const userInfo = await admin.auth().verifyIdToken( authToken )
            req.otrosDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser( userInfo.uid )
            req.otrosDatos.datosAuthSolicitante = datosAuthSolicitante

            if ( datosAuthSolicitante.disabled ) throw new Error("Usuario deshabilitado")

            return next()
    
        } catch ( error ) {
            console.log('estaAutenticado: ', error)
            next(error)
        }
    }

    getAuthToken(req, res, myNext)
    
}

module.exports = middlewaresUsuario