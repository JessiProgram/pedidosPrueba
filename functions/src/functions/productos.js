const functions = require('firebase-functions')

const admin = require('../../firebase-service')
const db = require('../../db')
const config = require('../../config')
const Producto = require('../models/Producto')

const ff = {}

const INDEX_NAME = config.environment.mode === 'production' ? 'prod_productos' : 'dev_productos'

// SI SE ACTUALIZA UN DOCUMENTO CURSO, VERIFICAR SU VALIDEZ
ff.indexAlgoliaProducto = functions
.region('southamerica-east1')
.firestore.document('Productos/{uidProducto}')
.onUpdate(async ( change, context ) => {
    const document = change.after.exists ? change.after : null
    const oldDocument = change.before.exists ? change.before : null

    const { uidProducto } = context.params
    
    // The API ID and key are stored using Cloud Functions config variables.
    // @see https://firebase.google.com/docs/functions/config-env
    const ALGOLIA_APP_ID = config.algolia_service.app_id
    const ALGOLIA_API_KEY = config.algolia_service.api_key

    // Create an Algolia Search API client.
    const client = algoliasearch.default(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const index = client.initIndex(INDEX_NAME)

    async function deleteObject() {
        await index.deleteObject(uidProducto)

        return true 
    }

    async function saveObject() {
        const producto = new Producto(document.data())
        const datosProducto = producto.getProducto()

        datosProducto.objectID = datosProducto.uid
        delete datosProducto.uid

        await index.saveObject(datosProducto)

        return true
    }

    if (!document) return await deleteObject(uidProducto)
    else return await saveObject()
})


module.exports = ff