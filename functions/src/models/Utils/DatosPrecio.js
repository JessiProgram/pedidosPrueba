class DatosPrecio {
    constructor ( precio , porcentajeDescuento ) {
        this.precio = precio ? Number(precio) : 0
        this.porcentajeDescuento = porcentajeDescuento ? Number(porcentajeDescuento) : 0
    }

    getDatosPrecio() {
        return {
            precio: this.precio,
            porcentajeDescuento: this.porcentajeDescuento
        }
    }
}

module.exports = DatosPrecio