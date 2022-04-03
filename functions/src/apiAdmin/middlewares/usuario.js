const db = require("../../../db")
const Admin = require("../../models/Admin")
const Rol = require("../../models/Rol")

const middleware = {}

middleware.esAdmin = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.otrosDatos
        
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


middleware.esPropietario = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.otrosDatos
        
        const admin = await Admin.obtenerAdminPorUID(uidSolicitante)

        if (!admin) {
            // No autorizado
            throw new Error("Usuario no autorizado")
        }

        if ( !admin.esPropietario ) {
            // No autorizado
            throw new Error("Usuario no autorizado")
        }
        
        return next()

    } catch ( error ) {
        next(error)

    }

}


middleware.validarPermisosParaActualizacionDeRol = async (req, res, next) => {
    
    try {
        const { uidSolicitante, datosAuthSolicitante } = req.otrosDatos
        const { uidUsuario } = req.params
        const { rol } = req.body

        // no puede ser el mismo usuario
        if (uidSolicitante === uidUsuario) {
            // Mala solicitud
            throw new Error("No puedes cambiarte el rol.")
        }
        
        // tiene que existir el rol. 
        const objectRol = await Rol.obtenerRolPorUID(rol)
        if (!objectRol) {
            // Mala solicitud
            throw new Error("No existe este rol.")
        }

        const objectAdmin = await Admin.obtenerAdminPorUID(uidUsuario)

        // Si se quiere actualizar el rol de un usuario admin que es propietario
        if (objectAdmin && objectAdmin.esPropietario) {
            // tiene que existir al menos un usuario como propietario. 
            const snapshot = await db.collection('Administradores').where('esPropietario', '==', true).get()

            if (snapshot.size === 1) {
                // Mala solicitud
                throw new Error("Tiene que existir al menos 1 propietario en el sistema.")
            }
        }
        
        return next()

    } catch ( error ) {
        next(error)

    }

}



module.exports = middleware