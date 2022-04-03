
const admin = require('../../../firebase-service')
const Usuario = require("../../models/Usuario")
const Autenticacion = require("../../models/Autenticacion")

const controller = {}

controller.actualizarRol = async (req, res) => {
    try {
        const { otrosDatos, params, body } = req
        const { uid } = params
        const { rol } = body
        
        Usuario.actalizarUsuarioPorUID(uid, {
            rol
        })

        const auth = new Autenticacion(uid)
        auth.actualizar({
            claims: { rol }
        })

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se cambio el rol usuario de forma correcta.',
            resultado: "ok"
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al cambiar el rol el usuario.',
            resultado: error,
        })
    }
}

module.exports = controller