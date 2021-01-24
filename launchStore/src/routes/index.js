const express = require("express")
const routes = express.Router()

const HomeController = require("../app/controllers/HomeController")

const products = require("./products")
const users = require("./users")
//const cart = require("./cart")
//const orders = require("./orders")

routes.get("/", HomeController.index)

routes.use("/users", users)
routes.use("/products", products)
//routes.use("/cart", cart)
//routes.use("/orders", orders)

// Alias
routes.get("/ads/create", function (req, res) {
  return res.redirect("/products/create")
})

routes.get("/users", function (req, res) {
  return res.redirect("/users/index")
})



module.exports = routes