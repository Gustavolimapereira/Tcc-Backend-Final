const mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'teste',
    password: 'teste',
    database: 'matchjob'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = db