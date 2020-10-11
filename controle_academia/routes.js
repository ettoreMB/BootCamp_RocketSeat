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
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)


routes.post('/instructors', instructors.post)


module.exports = routes