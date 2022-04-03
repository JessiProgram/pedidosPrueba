const functions = require('firebase-functions')


const admin = require('../../firebase-service')
const db = require('../../db')
const Usuario = require('../models/Usuario')
const Admin = require('../models/Admin')


const ff = {}


ff.eventoCreacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}')
.onCreate(async ( change, context ) => {
    const doc = change

    const { uidUsuario } = context.params

    const usuario = new Usuario(doc.data())

    if (usuario.rol === 'admin') {
        // TODO: Agregar Administrador
        const admin = new Admin({
            uid: uidUsuario,
        })
        
        Admin.crearAdmin(admin)
    }
})


ff.eventoActualizacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}')
.onUpdate(async ( change, context ) => {
    const docNuevo = change.after
    const docViejo = change.before

    const { uidUsuario } = context.params

    const usuarioNuevo = new Usuario(docNuevo.data())
    const usuarioViejo = new Usuario(docViejo.data())

    if (usuarioNuevo.rol !== usuarioViejo.rol) {
        if (usuarioViejo.rol === 'cliente' && usuarioNuevo.rol === 'admin') {
            // TODO: Agregar Administrador 
            const admin = new Admin({
                uid: uidUsuario,
            })
            
            Admin.crearAdmin(admin)
        }

        if (usuarioViejo.rol === 'admin' && usuarioNuevo.rol === 'cliente') {
            // TODO: Eliminar Administrador 
            Admin.eliminarAdminPorUID(uidUsuario)
        }
    }
})



ff.eventoEliminacionUsuario = functions
.region('southamerica-east1')
.firestore.document('Usuarios/{uidUsuario}')
.onDelete(async ( change, context ) => {
    const doc = change

    const { uidUsuario } = context.params

    const usuario = new Usuario(doc.data())
    
    if (usuario.rol === 'admin') {
        // TODO: Eliminar Administrador 
        Admin.eliminarAdminPorUID(uidUsuario)
    }

})


module.exports = ff