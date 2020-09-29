const express = require('express')
const routes = express.Router()



routes.get('/', (req,res) => {
    return res.render('instructors/index')
})

routes.get('/instructors', (req,res) => {
    return res.render('instructors/index')
})

routes.get('/instructors/create', (req, res) =>{
    return res.render('instructors/create')
})


routes.post('/instructors', (req,res)=> {
    const keys = Object.keys(req.body)
    
    for(key of keys) {
        if( req.body[key] == "") {
           return res.send('Preencha todos os campos')
            }
        }
        return res.send(req.body)
    }
)


module.exports = routes