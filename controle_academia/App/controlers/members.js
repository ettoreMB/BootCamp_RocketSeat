const fs = require("fs")
const data = require("../../data.json")
const {age, date} = require("../utils")


exports.index =(req,res) => {

    return res.render('members/index', {members: data.members})
}

exports.create = (req, res) =>{
    return res.render('members/create')
}

exports.show = (req, res) => {
    const {id} = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember) return res.send("member not found") 


    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        services: foundMember.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at),
    }
    
    return res.render('members/show', {member})
    
}

exports.edit = (req, res) => {
    const {id} = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember) return  alert('structor not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }
    console.log(member)

    return res.render("members/edit", {member})
}

exports.post = (req,res)=> {
    const keys = Object.keys(req.body)
    
    for(key of keys) {
        if( req.body[key] == "") {
           return res.send('Preencha todos os campos')
            }
        }

        let {avatar_url, birth, services, name,gender} = req.body

        birth = Date.parse(birth)
        const created_at = Date.now()
        const id = Number(data.members.length + 1)


        data.members.push({
            id,
            name,
            avatar_url,
            birth,
            gender,
            created_at,
            services,
        })

        fs.writeFile("data.json", JSON.stringify(data.members,null,2), (err) =>  {
            if (err) return res.send('Write File Error')

            return res.redirect(`members`)
        })

}

exports.put = (req, res) => {
    const {id} = req.body
    let index = 0
    const foundMember = data.members.find((member, foundIndex) => {
        if ( id == member.id) {
            index === foundIndex
            return true
        }
    })

    if (!foundMember) return  alert('structor not found')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) =>{
        if (err) return res.send('Write File error!')

        return res.redirect(`members/${id}`)
    })


}

exports.delete = (req, res) => {
    const {id} = req.body

    const filteredMembers = data.members.filter((member) => {
        
        return member.id !== id 
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data[members], null, 2), (err) => {
        if(err) return res("!!Write File Error")

        return res.redirect('/members')
    })
}