var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'teste',
        password: 'teste',
        database: 'matchjob'
    }
});
module.exports = knex