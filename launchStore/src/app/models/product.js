const db = require('../../config/db')

module.exports = {
 async create(data) {
    const query = `INSERT INTO products (
      category_id,
      name,
      description,
      old_price,
      price,
      quantity,
      status
    ) VALUES (?,?,?,?,?,?,?);
    
    `

    const values = [
      data.category_id,
      data.name,
      data.description,
      data.old_price,
      data.price,
      data.quantity,
      data.status
    ]

    return await db.query(query, values)
  }
}