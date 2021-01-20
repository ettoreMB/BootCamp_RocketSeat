const User = require('../models/User')


async function post (req, res, next) {

   // check if has all fields
   const keys = Object.keys(req.body)
   for (key of keys) {
    if (req.body[key] == "") {
      return res.render('user/register',{
        user: req.body,
        error: 'Preencha todos os campos'
      })
    }
   }

   //check if user exists
        
   let{email, cpf_cnpj, password, passwordrepeat} = req.body
   cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
   
   const user = await User.findOne({
       where: { email },
       or: { cpf_cnpj },
   })

   if(user) return res.render('user/register', {
     user: req.body,
     error: 'usuario ja cadastrado.'
   })
   //check password match

   if (password != passwordrepeat) return res.render('user/register', {
     user: req.body,
     error: 'O campo da senha eta diferente'
   })
       
   
      

  next()
}
module.exports = {
  post
}