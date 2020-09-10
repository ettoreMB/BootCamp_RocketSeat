const express = require("express")
const nunjuncks = require("nunjucks")
const routes = require('./routes')


const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static("public"))
server.use(routes)

server.set("view engine", "njk")

nunjuncks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(3000, function() {
    console.log("Server is running on port 3000")
})