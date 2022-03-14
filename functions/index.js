const functions = require("firebase-functions");
// REST-API DE KAMBAI
const api = require('./api')

// REST-API de Kambai
exports.api = functions.region('southamerica-east1').https.onRequest(api)