const  express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res)=>{
    return res.render('index')
})

server.get('/classes', (req, res)=>{
    return res.render('classes', {items: videos})
})

server.listen(5000, () => {
    console.log('server is runnig')
})