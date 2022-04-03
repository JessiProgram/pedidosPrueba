class Ubicacion {
    constructor ( datos = {} ) {
        const { uid, principal, ubicacion } = datos

        this.uid = uid ? uid : ''
        this.principal = principal ? principal : false
        this.ubicacion = ubicacion ? ubicacion : null
    }

    
}

module.exports = Ubicacion