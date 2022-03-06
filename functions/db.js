const admin = require('./firebase-service')

console.log('Base de datos lista')

module.exports = admin.firestore()