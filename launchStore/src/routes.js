const express = require('express')
const routes = express.Router()
const productController = require('./app/controllers/productsController')


routes.get('/', (req, res) => {
    return res.render('index')
})

routes.get('/products/create', productController.create)
routes.post('/products', productController.post)


//Alias
routes.get('/ads/create', (req,res) => {
    return res.redirect('/products/create')
})


module.exports = routes