async function post(req, res, next) {
    try {
        // Separates the 'Object' data by its 'keys' and checks if it's not empty  
        const keys = Object.keys(req.body)
        
        for (let key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, volte e preencha todos os campos.")
        }
    
        if (!req.files || req.files.length == 0)
            return res.send("Por favor, envie pelo menos uma imagem.")
    
        next()
        
    } catch (error) {
        console.error(error)
    }
}

async function put(req, res, next) {
    try {
        // Separates the 'Object' data by its 'keys' and checks if it's not empty
        const keys = Object.keys(req.body)
        
        for (let key of keys) {
            if (req.body[key] == "" && key != "removed_files")
                return res.send("Por favor, volte e preencha todos os campos.")
        }

        if (!req.files || req.files.length == 0)
            return res.send("Por favor, envie pelo menos uma imagem.")
    
        next()
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    post,
    put
}