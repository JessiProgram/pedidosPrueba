const admin = require('firebase-admin')

const serviceAccount = require('./pedidos-2022-firebase-adminsdk.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

console.log('Administracion de firebase lista')

module.exports = admin