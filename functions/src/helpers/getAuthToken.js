const getAuthToken = (req, res, next) => {
    const { authorization } = req.headers

    req.otrosDatos = req.otrosDatos ? req.otrosDatos : {}

    if(authorization && authorization.split(' ')[0] === 'Bearer'){
        req.otrosDatos.authToken = authorization.split(' ')[1]
    }else{
        req.otrosDatos.authToken = null
    }

    next()
}


module.exports = getAuthToken