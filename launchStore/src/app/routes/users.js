const express = require('express')
const routes = express.Router()


const sessionController = require('../controllers/sessionController')
const userController = require('../controllers/userConytoller')

//login - logout
routes.post('/login', sessionController.login)
routes.get('/login', sessionController.loginForm)

routes.post('/logout', sessionController.logout)

//reset/ forgot password
routes.get('/forgot-password', sessionController.forgotForm)
routes.get('/password-reset', sessionController.resetForm)
routes.post('/forgot-password', sessionController.forgot)
routes.post('/password-reset', sessionController.reset )


//userController Register
routes.get('/register', userController.registerForm)
routes.post('/resgister', userController.post)

routes.get('/', userController.show)
routes.put('/', userController.update)
routes.delete('/', userController.delete)


module.exports = routes