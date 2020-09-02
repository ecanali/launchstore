const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override') // Para conseguir usar método PUT no meu form

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method')) // Tem que vir antes de 'routes' pra sobrescrever certo
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.use(function(req, res) {
    res.status(404).render('not-found')
})

server.listen(3003, function() {
    console.log('server is running...')
})