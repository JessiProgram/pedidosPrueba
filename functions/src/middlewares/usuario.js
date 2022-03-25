const admin = require('../../firebase-service')
const db = require('../../db')
const getAuthToken = require('../helpers/getAuthToken')

const middlewaresUsuario = {}

middlewaresUsuario.estaAutenticado = (req, res, next) => {

    const myNext = async () => {

        try {
            const { authToken } = req.pedidosDatos

            const userInfo = await admin.auth().verifyIdToken(authToken)
            req.pedidosDatos.uidSolicitante = userInfo.uid

            const datosAuthSolicitante = await admin.auth().getUser(userInfo.uid)
            req.pedidosDatos.datosAuthSolicitante = datosAuthSolicitante

            if (datosAuthSolicitante.disabled) {
                throw new Error("Usuario deshabilitado")
            }

            return next()

        } catch (error) {
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

        if (rol !== 'admin') {
            // No autorizado
            throw new Error("Usuario no autorizado")
        }

        return next()

    } catch (error) {
        next(error)

    }

}

middlewaresUsuario.verificarDatosRequeridos = (req, res, next) => {
    try {
        const { pedidosDatos, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body

        const esOperacionAgregar = req.method === 'POST'

        if (!Object.keys(body).length) {
            throw new Error('No hay datos para crear un usuario.')
        }

        if ((!datosUsuario || !Object.keys(datosUsuario).length) && !contrasenha) {
            throw new Error('No hay datos para crear un usuario.')
        }

        if (esOperacionAgregar) {

            if (Object.keys(body).length !== 3) {
                throw new Error({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No hay datos para crear un usuario.'
                })
            }

            if (!datosUsuario) {
                throw new Error('No hay datos para crear un usuario.')
            }

            if (!contrasenha) {
                throw new Error('No existe la contraseña.')
            }

            if (!confirmacionContrasenha) {
                throw new Error('No existe la confirmación de contraseña.')
            }

            const {
                correo,
                nombreCompleto,
            } = datosUsuario

            if (!nombreCompleto) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existe el nombre de usuario.'
                })
            }

            if (!correo) {
                throw new ErrorJekuaa({
                    codigo: 'jekuaa/error/usuario_mala_solicitud',
                    mensaje: 'No existe el correo.'
                })
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

middlewaresUser.verificarTipoDeDatosCliente = (req, res, next) => {
    try {
        const { pedidosDatos, body } = req
        const { datosUsuario, contrasenha, confirmacionContrasenha } = body

        const esRutaAdmin = req.originalUrl.includes('adminJekuaa')

        if (datosUsuario) {
            if (typeof datosUsuario != 'object') {
                throw new ErrorJekuaa('Los datos usuario debe ser un objecto.')
            }

            const {
                uid,
                nombreCompleto,
                correo,
                cedula,
                ciudad,
                fechaNacimiento,
                datosUbicacion,
                datosTelefono,
                rol,
            } = datosUsuario

            if (correo && typeof correo != 'string') {
                throw new TypeError('El correo debe ser de tipo string.', 'Usuario.js')
            }

            if (nombreCompleto && typeof nombreCompleto != 'string') {
                throw new TypeError('Debe de ser de tipo string el nombre completo del usuario.', 'Usuario.js')
            }

            if (fechaNacimiento && typeof fechaNacimiento != 'number') {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
            }

            if (cedula && typeof cedula != 'string') {
                throw new TypeError('Debe de ser de tipo string la cedula del usuario', 'Usuario.js')
            }

            if (ciudad && typeof ciudad != 'string') {
                throw new TypeError('Debe de ser de tipo string la ciudad del usuario', 'Usuario.js')
            }

            if (datosUbicacion && typeof datosUbicacion != 'object') {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
            }

            if (datosTelefono && typeof datosTelefono != 'object') {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
            }

            if (rol && typeof rol != 'number') {
                throw new TypeError('La fecha de nacimiento debe ser de tipo number en milisegundos.', 'Usuario.js')
            }
        }

        if (contrasenha) {
            if (typeof contrasenha != 'string') {
                throw new TypeError('La contraseña debe ser de tipo string.', 'Usuario.js')
            }

            if (typeof confirmacionContrasenha != 'string') {
                throw new TypeError('La confirmación de contraseña debe ser de tipo string.', 'Usuario.js')
            }
        }

        next()

    } catch (error) {
        next(error)
    }
}


module.exports = middlewaresUsuario