const express = require('express')
const routes = express.Router()

const homeController = require('../controllers/HomeController') 
const products = require('./products')
const users = require('./users')

//home
routes.get('/', homeController.index)

//users
routes.use('/users', users)

//products
routes.use('/products', products)

//Alias
routes.get('/ads/create', (req,res) => {
    return res.redirect('/create')
})

module.exports = routes