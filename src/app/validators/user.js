const { compare } = require('bcryptjs')

const User = require('../models/User')

function checkAllFields(body) {
    // check if it has all fields
    const keys = Object.keys(body)

    for (let key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: "Por favor, preencha todos os campos."
            }
        }
    }
}

async function show(req, res, next) {
    try {
        const { userId: id } = req.session
    
        const user = await User.findOne({ where: {id} })
    
        if (!user) return res.render('user/register', {
            error: "Usuário não encontrado!"
        })
    
        req.user = user
    
        next()
        
    } catch (error) {
        console.error(error)
    }
}

async function post(req, res, next) {
    try {
        // check if it has all fields
        const fillAllFields = checkAllFields(req.body)
    
        if (fillAllFields) {
            return res.render('user/register', fillAllFields)
        }
    
        // check if user exists [email, cpf_cnpj uniques]
        let { email, cpf_cnpj, password, passwordRepeat } = req.body
    
        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
    
        const user = await User.findOne({
            where: { email },
            or: { cpf_cnpj }
        })
    
        if (user) return res.render('user/register', {
            user: req.body,
            error: "Usuário já cadastrado."
        })
    
        // check if password match
        if (password != passwordRepeat) {
            return res.render('user/register', {
                user: req.body,
                error: "A senha e/ou repetição da senha estão incorretas."
            })
        }
    
        next()
        
    } catch (error) {
        console.error(error)
    }
}

async function update(req, res, next) {
    try {
        // check if it has all fields
        const fillAllFields = checkAllFields(req.body)
    
        if (fillAllFields) {
            return res.render('user/index', fillAllFields)
        }
    
        const { id, password } = req.body
    
        if (!password) return res.render('user/index', {
            user: req.body,
            error: "Coloque sua senha para atualizar seu cadastro."
        })
    
        const user = await User.findOne({ where: {id} })
    
        const passed = await compare(password, user.password)
    
        if (!passed) return res.render("user/index", {
            user: req.body,
            error: "Senha incorreta."
        })
    
        req.user = user
    
        next()
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    post,
    show,
    update
}