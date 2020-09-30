async function post(req, res, next) {
    // Separa info do Objeto vindo do form por suas Chaves e testa se n veio vazio
    const keys = Object.keys(req.body)
    
    for (let key of keys) {
        if (req.body[key] == "")
            return res.send("Por favor, volte e preencha todos os campos.")
    }

    if (!req.files || req.files.length == 0)
        return res.send('Por favor, envie pelo menos uma imagem.')

    next()
}

async function put(req, res, next) {
    console.log(req.body)
    
    // Separa info do Objeto vindo do form por suas Chaves e testa se n veio vazio
    const keys = Object.keys(req.body)
    
    for (let key of keys) {
        if (req.body[key] == "" && key != "removed_files")
            return res.send("Por favor, volte e preencha todos os campos.")
    }

    next()
}

module.exports = {
    post,
    put
}