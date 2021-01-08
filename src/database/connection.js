const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10385846',
    password: 'pFJcwlIICj',
    database: 'sql10385846',
    waitForConnections: true,
})

module.exports = connection