const dbmysql = require('../database/connectionMysql');

module.exports = {

    async Login(req, res) {
        const { username } = req.body;

        const sqlSelect = "select * from usuarios u inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta where u.usuario = ?";
        dbmysql.query(sqlSelect, username, (err, result) => {
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json({message: "Usuario não encontrado"});
            }
        });
    }
};