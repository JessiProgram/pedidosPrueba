
const admin = require('../../firebase-service')
const Usuario = require("../models/Usuario")
const Authentication = require("../models/Autenticacion")

const controller = {}

controller.crearUsuario = async (req, res) => {
    try {
        const { body, pedidosDatos } = req
        const { datosUsuario, contrasenha } = body

        // Crear usuario
        const auth = new Authentication()
        const usuario = new Usuario(datosUsuario)
        console.log("xdxdxdxd")
        const uid = await auth.crear(usuario, contrasenha)
        usuario.setUid(uid)
        console.log("ssssss")
        Usuario.crearUsuario(usuario)
        console.log("aaaaaa")

        return res.status(200).json({
            codigo: 'exito',
            mensaje: 'Se creo el usuario de forma correcta.',
            resultado: "ok"
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'error-servidor',
            mensaje: 'Hubo un problema al crear el usuario.',
            resultado: error,
        })
    }
}

controller.actualizarRol = async (req, res) => {
    try {
        const { body, params, pedidosDatos } = req
        const { rol } = body
        const { uid } = params

        Usuario.actalizarUsuarioPorUID(uid, body)

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