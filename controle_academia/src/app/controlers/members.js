const Member = require('../../models/member')
const {date,age} = require("../../lib/utils")

module.exports = {
    index(req,res) {
        let  {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 5
        let offset = limit * (page -1)

        const params = {
            filter, 
            page,
            limit,
            offset,
            callback(members) {
                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
                return res.render('members/index', {members, pagination, filter})
            }
        }

        Member.paginate(params)
    
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