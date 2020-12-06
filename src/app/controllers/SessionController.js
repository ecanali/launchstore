const crypto = require('crypto')
const { hash } = require('bcryptjs')

const User = require('../models/User')

const mailer = require('../../lib/mailer')

module.exports = {
    loginForm(req, res) {
        return res.render('session/login')
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()

        return res.redirect('/')
    },
    forgotForm(req, res) {
        return res.render('session/forgot-password')
    },
    async forgot(req, res) {
        try {
            const user = req.user

            // create token
            const token = crypto.randomBytes(20).toString("hex")
    
            // create 1h expiration to the token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)
    
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
    
            // send email (by "nodemailer") with recovery password link
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: "Recuperação de senha | Launchstore",
                html: `<h2>Perdeu a chave?</h2>
                <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
                <p>
                    <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                </p>
                `
            })
    
            // notify the user that the recovery email has been sent
            return res.render('session/forgot-password', {
                success: "Verifique seu email para resetar sua senha!"
            })
            
        } catch (error) {
            console.error(error)
            
            return res.render('session/forgot-password', {
                error: "Erro inesperado, tente novamente!"
            })
        }
    },
    resetForm(req, res) {
        return res.render('session/password-reset', { token: req.query.token })
    },
    async reset(req, res) {
        try {
            const user = req.user
            const { password } = req.body

            // create new password hash
            const newPassword = await hash(password, 8)

            // update user
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            // notify user new password ok
            return res.render('session/login', {
                user: req.body,
                success: "Senha atualizada! Faça seu login"
            })

        } catch (error) {
            console.error(error)
            
            return res.render('session/password-reset', {
                user: req.body,
                token: req.body,
                error: "Erro inesperado, tente novamente!"
            })
        }
    }
}