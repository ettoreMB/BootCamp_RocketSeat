const Instructor = require('../../models/instructor')
const {date, age} = require("../../lib/utils")

module.exports = {
    index(req,res) {
        Instructor.all((instructors) =>{
        return res.render('instructors/index', {instructors})
       })

       
    },
    create(req,res) {
        return res.render('instructors/create')
    },
    show(req,res) {
        Instructor.find(req.params.id, (instructor) => {
            if (!instructor) return res.send('Instructor not found')

            instructor.birth = age(instructor.birth)
            instructor.services = instructor.services.split(',')

            instructor.created_at = date(instructor.created_at).format
            return res.render(`instructors/show`, {instructor} )
        })
            
        
    },

    edit(req,res) {
        Instructor.find(req.params.id, (instructor) => {
            if (!instructor) return res.send('Instructor not found')

            instructor.birth = date(instructor.birth).iso
            console.log(instructor)
            return res.render(`instructors/edit`, {instructor} )
        })
            
    },
    post(req,res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if( req.body[key] == "") {
               return res.send('Preencha todos os campos')
                }
            }
      Instructor.create(req.body, (instructor) =>{
        return res.render(`intructors/${instructor.id}`)
      })
         
      
           
        
    },
    put(req,res) {
        Instructor.update(req.body, () => {
            return res.redirect(`instructors/${req.body.id}`)
        })
    
    },
    delete(req,res) {
        Instructor.delete(req.body.id, () => {
            return res.redirect('instructors')
        })
    

    },

}