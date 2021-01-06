const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'acessog10',
    database: 'bank',    
})

connection.connect((e) => {
    if(e){
        console.log('erro ao conectar: ', e)
    }

    console.log('conectado!')
})

module.exports = connection