const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override') // In order to user the method 'PUT' in my 'form' elements

const routes = require('./routes')
const session = require('./config/session')

const server = express()

server.use(session)
server.use((req, res, next) => {
    res.locals.session = req.session
    next()
}) // makes the "session" variable available globally (with access to all pages)
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.use((req, res) =>
    res.status(404).render('not-found'))

server.listen(3003, () =>
    console.log("server is running..."))