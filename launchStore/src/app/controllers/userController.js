const User = require('../models/User')

module.exports = {
    registerForm(req,res) {
        return res.render('user/register')
    },
    async post(req, res) {
        try {
           const UserId = await User.create(req.body)
           return res.send('CADASTRO COM SUCESSO')

       
        } catch (error) {
            console.log(error)
        }
    }
}