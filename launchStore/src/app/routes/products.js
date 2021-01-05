const express = require('express')
const routes = express.Router()
const multer = require('../middlewares/multer')

const productController = require('../controllers/productsController')
const searchController = require('../controllers/searchController')

//Search
routes.get('//search', searchController.index)

//Products
routes.get('//create', productController.create)
routes.get('//:id', productController.show )
routes.get('//:id/edit', productController.edit)


//create product
routes.post('/', multer.array("photos", 6), productController.post)
routes.put('/', multer.array("photos", 6), productController.put)
routes.delete('/', productController.delete)





module.exports = routes