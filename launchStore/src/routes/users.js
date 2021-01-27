const express = require('express')
const routes = express.Router()

const UserValidaor = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const sessionController = require('../app/controllers/sessionController')
const { isLoggedREdirectToUsers, onlyUsers } = require('../app/middlewares/session')

// const sessionController = require('../controllers/sessionController')
const userController = require('../app/controllers/userController')

// //login - logout
routes.get('/login',isLoggedREdirectToUsers, sessionController.loginForm)
routes.post('/login', SessionValidator.login,sessionController.login)
routes.post('/logout', sessionController.logout)

// //reset/ forgot password
routes.get('/forgot-password', SessionValidator.forgot, sessionController.forgotForm)
// routes.get('/password-reset', sessionController.resetForm)
routes.post('/forgot-password', sessionController.forgot)
// routes.post('/password-reset', sessionController.reset )


// //userController Register
routes.get('/register', userController.registerForm)
routes.post('/register', UserValidaor.post, userController.post)

routes.get('/',onlyUsers,UserValidaor.show, userController.show)
routes.put('/', UserValidaor.update, userController.update)
// routes.delete('/', userController.delete)


 module.exports = routes