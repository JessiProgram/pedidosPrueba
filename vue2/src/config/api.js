const apiKambai = {
    url: process.env.NODE_ENV === 'development' ? 
        'http://localhost:5001/kambai/southamerica-east1/kambaiApi' : 
        'https://southamerica-east1-kambai.cloudfunctions.net/kambaiApi'
}

export default apiKambai