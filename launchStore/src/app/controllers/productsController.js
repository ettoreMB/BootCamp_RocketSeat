const Category = require('../models/Category')
const Product = require('../models/Product')


module.exports = {
  async create(req, res) {
    
   const  categories = await Category.all()
    return res.render('products/create.njk', {categories})
  
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Preencha todos os campos')
      }
    }

   const  results =  Product.create(req.body)

    const productId = results[0].id
    console.log(productId)

   const categories = await Category.all()


   return res.render('products/create', { categories})

  }
}