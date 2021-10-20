const dbmysql = require('../database/connectionMysql');

module.exports = {

    async Trabalhos(req,res){

        const sqlSelect = "select * from trabalho";
        dbmysql.query(sqlSelect, (err, result)  => {
            console.log(result);
            return res.json(result);
        });
        
    },

    async conta(req,res){

        const sqlSelect = "select * from tipo_conta";
        dbmysql.query(sqlSelect, (err, result)  => {
            console.log(result);
            return res.json(result);
        });
        
    }

};