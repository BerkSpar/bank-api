const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'acessog10',
    database: 'bank',    
    waitForConnections: true,
})

module.exports = connection