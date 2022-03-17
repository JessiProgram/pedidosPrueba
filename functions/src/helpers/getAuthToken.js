const getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.pedidosDatos = req.pedidosDatos ? req.pedidosDatos : {}

    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.pedidosDatos.authToken = authorization.split(' ')[1]
    }else{
        req.pedidosDatos.authToken = null
    }

    next()
}


module.exports = getAuthToken