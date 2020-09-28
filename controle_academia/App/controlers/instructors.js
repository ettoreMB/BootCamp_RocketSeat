const fs = require('fs')

exports.post = (req,res)=> {
    const keys = Object.keys(req.body)
    
    for(key of keys) {
        if( req.body[key] == "") {
           return res.send('Preencha todos os campos')
            }
        }

        fs.writeFile("data.json", JSON.stringify(req.body), (err) =>  {
            if (err) return res.send('Write File Error')

            return res.redirect('/instructors')
        })

        return res.send(req.body)
    }