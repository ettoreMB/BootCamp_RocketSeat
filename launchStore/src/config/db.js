const mysql2 = require('mysql2/promise')
const Bluebird = require('bluebird')

module.exports = 
         mysql2.createPool({
        user: 'root',
        password: "2507",
        host: 'localhost',
        port: 3306,
        database: 'launchstore',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        Promise: Bluebird
    })

     
 


