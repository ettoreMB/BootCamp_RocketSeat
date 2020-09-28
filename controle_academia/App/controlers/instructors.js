import { writeFile } from 'fs'
import data, { instructors } from './data.json'

export function post(req,res) {
    const keys = Object.keys(req.body)
    
    for(key of keys) {
        if( req.body[key] == "") {
           return res.send('Preencha todos os campos')
            }
        }

        data.instructors.push(req.body)

        writeFile("data.json", JSON.stringify(data), (err) =>  {
            if (err) return res.send('Write File Error')

            return res.redirect('/instructors')
        })

        return res.send(req.body)
}

export function create(req, res){
    return res.render('instructors/create')
} 

