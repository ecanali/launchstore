const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render('user/register')
    },

    async post(req, res) {
        // check if has all fields
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "")
                return res.send("Please, fill out all fields")
        }

        // check if user exists [email, cpf_cnpj uniques]
        const { email, cpf_cnpj } = req.body

        const user = await User.findOne({
            where: { email },
            or: { cpf_cnpj }
        })

    }
}