const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
const {formatPrice} = require ('../../lib/utils.js')



module.exports = {
  async create(req, res) {
    
   const  results = await Category.all()
   const categories = results.rows
 
    return res.render('products/create.njk', {categories})
  
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Preencha todos os campos')
      }
    }

    if(req.files.length == 0)
      return res.send('Envie pelo menos 1 imagem')
  

    let  results = await Product.create(req.body)
    const productId = results.rows[0].id

   const filePromise = req.files.map(file => File.create({
  ...file, product_id: productId
   }))

   await Promise.all(filePromise)
    

   return res.redirect(`/products/${productId}/edit`)

  },

  async edit(req, res) {

    let results = await Product.find(req.params.id);
    const product = results.rows[0];
    if (!product) return res.send("Product not found!");
    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await Category.all();
    const categories = results.rows;
    

    return res.render("products/edit", { product, categories });
  }, 
  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if(req.body[key] == "") {
        return res.send('Preencha todos os campos')
      }
    }
  


    if (req.body.old_price != req.body.price) {

      req.body.old_price = oldProduct.rows[0].price;
  }
   Product.update(req.body);
  return res.send(req.body);
  },

  async delete(req, res) {
    await Product.delete(req.body.id)
    return res.redirect('/products/create')
  }

}