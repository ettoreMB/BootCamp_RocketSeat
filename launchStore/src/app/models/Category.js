const db = require('../../config/db')

module.exports = {
   async all() {
      const [rows,fields] = await db.query(`SELECT * FROM categories`)
      
      return rows
    }
        
}