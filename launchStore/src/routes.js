const express = require('express')
const routes = express.Router()


routes.get("/", function(req, res) {
    return res.redirect('index')
})

module.exports = routes