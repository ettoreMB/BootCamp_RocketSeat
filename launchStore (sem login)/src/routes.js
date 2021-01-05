const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const productController = require('./app/controllers/productsController')
const homeController = require('./app/controllers/HomeController.js')
const searchController = require('./app/controllers/searchController')

//home
routes.get('/', homeController.index)

//Search
routes.get('/products/search', searchController.index)

//Products
routes.get('/products/create', productController.create)
routes.get('/products/:id', productController.show )
routes.get('/products/:id/edit', productController.edit)


//create product
routes.post('/products', multer.array("photos", 6), productController.post)
routes.put('/products', multer.array("photos", 6), productController.put)
routes.delete('/products', productController.delete)


//Alias
routes.get('/ads/create', (req,res) => {
    return res.redirect('/products/create')
})




module.exports = routes