const Instructor = require('../../models/instructor')
const {date, age} = require("../../lib/utils")
const instructor = require('../../models/instructor')

module.exports = {
    index(req,res) {
        let { filter, page, limit } = req.query 

        page = page || 1
        limit = limit || 5
        let offset =  limit * (page -1)
        
        const params = { 
          filter,
          page,
          limit,
          offset,
          callback(instructors) {

            const pagination = {
                total: Math.ceil(instructors[0].total / limit),
                page
            }
            return res.render("instructors/index", {instructors, pagination, filter})
          }
        }

        Instructor.paginate(params)

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
        return res.redirect(`instructors`)
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