const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.static('App/public'))

server.set('view engine', 'njk')
server.use(routes)
nunjucks.configure('App/views', {
    express: server,
    autoescape: false,
    noCache: true,

})

server.listen(5000, () => {
    console.log('server is running on port:5000')
})