const express = require('express')
const routes = express.Router()
const instructors = require('./App/controlers/instructors')



routes.get('/', (req,res) => {
    return res.render('instructors/index')
})

routes.get('/instructors', (req,res) => {
    return res.render('instructors/index')
})

routes.get('/instructors/create', instructors.create)


routes.post('/instructors', instructors.post)


module.exports = routes