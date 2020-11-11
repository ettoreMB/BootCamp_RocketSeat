const Member = require('../../models/member')
const {date,age} = require("../../lib/utils")

module.exports = {
    index(req,res) {
        Member.all((members) => {
            return res.render('members/index', {members})
        })
    
    },
    create(req,res) {
        Member.instructorsSelectOptions((options) => {
        return res.render('members/create',{ instructorOptions: options })
        })
    

    },
    show(req,res) {
        Member.find(req.params.id, (member)=> {
            if (!member) return res.send('Member not found!')

        Member.instructorsSelectOptions((option) => {
            return res.render('members/show', {member})
        })
            
        })

    },
    edit(req,res) {

    Member.find(req.params.id, (member) => {
        if (!member) return res.send('Member not found!')

        Member.instructorsSelectOptions((options) => {
        return res.render('members/edit',{ member, instructorOptions: options })
        })

    })
     
    },

    post(req,res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if( req.body[key] == "") {
               return res.send('Preencha todos os campos')
                }
            }
    
            Member.create(req.body, (member) => {
                return res.redirect(`members/${member.id}`)
            })    
            
    },
    put(req,res) {
    
       Member.update(req.body, ()=>{
           return res.redirect(`members/${req.body.id}`)
       })
    

    },
    delete(req,res) {
       Member.delete(req.body.id, () => {
        return res.redirect('members')
       })
    

    }
 }