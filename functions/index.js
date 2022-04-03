const functions = require("firebase-functions")

const api = require('./api')
const { 
    eventoCreacionUsuario, 
    eventoActualizacionUsuario, 
    eventoEliminacionUsuario 
} = require("./src/functions/usuarios")

// REST-API
exports.api = functions.region('southamerica-east1').https.onRequest(api)


exports.eventoCreacionUsuario = eventoCreacionUsuario
exports.eventoActualizacionUsuario = eventoActualizacionUsuario
exports.eventoEliminacionUsuario = eventoEliminacionUsuario

exports.indexAlgoliaProducto = indexAlgoliaProducto