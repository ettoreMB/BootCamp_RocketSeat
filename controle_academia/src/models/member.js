const {date, age} = require("../lib/utils")
const db = require('../config/db')
const { query } = require("../config/db")

module.exports  = {
    all(callback) {
        db.query(`SELECT * FROM members
        `, (err, results) =>{
            if(err) throw `DataBase Error ${err}`

            callback(results.rows)
            console.log(results)
        })      
        
    },
    create(data, callback){
        const query = `INSERT INTO members(
            name,
            email,
            avatar_url,
            gender,
            goals,
            wheight,
            height,
            created_at, 
            instructor_id
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING id
        `
         
        const values = [
         data.name,
         data.email,
         data.avatar_url,
         data.gender,
         data.goals,
         data.wheight,
         data.height,
         date(Date.now()).iso,
         data.instructor
        ]

        db.query(query, values, (err,results)=> {
            if(err) `Database Error ${err}`
            callback(results.rows[0])
        })

        
    },
    find(id, callback){
        db.query(
            `SELECT members.*, instructors.name AS instructor_name
            FROM members
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, 
            [id], (err, results)=>{
                if(err) return res.send('!Database Error')

                callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT * FROM members
        WHERE members.name ILIKE '%${filter}%'
        OR members.email ILIKE '%${filter}%'
        ORDER BY name ASC
        `, (err, results) =>{
            if(err) throw `DataBase Error ${err}`

            callback(results.rows)
        })
    },

    update(data, callback) {
        const query = `
            UPDATE members SET
            name=($1),
            email=($2),
            avatar_url=($3),
            gender=($4),
            goals=($5),
            wheight=($6),
            height=($7),
            instructor_id=($8)
            WHERE id = $9
        `

        const values = [
            data.name,
            data.email,
            data.avatar_url,
            data.gender,
            data.goals,
            data.wheight,
            data.height,
            data.id,
            data.instructor,
        ]

        db.query(query, values, (err, results) =>{
            if(err) throw `DataBase Error ${err}`

            callback()
        })
    },
    delete(id,callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id],
            (err, results) => {
                if(err) throw `DataBase Error! ${err}`

                return callback()
            })
    },
    instructorsSelectOptions(callback) {
        db.query(`SELECT name, id FROM instructors`,
            (err, results) => {
                if (err) throw `Database Error${err}`
                callback(results.rows)
            }
        )
    },
    paginate(params) {
        const {filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT COUNT(*) FROM members) AS total`

        if (filter) {
            filterQuery = `
                WHERE members.name ILIKE '%${filter}%'
                OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) as total`
        }

        query = `
            SELECT members.* FROM members
            ${filterQuery}
            LIMIT $1
            OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `DataBase Error ${err}`

            callback(results.rows)
        })
    },
}