const database = require('../database/connection');
const dbmysql = require('../database/connectionMysql');

module.exports = {

    async ListarUsuarios(req, res) {
        const { id_usuario } = req.headers;

        const sqlSelect = "select * from usuarios u inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta where u.id_usuario not in (select a.id_usuario2 from usuarios u inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta left join registra_acao a on u.id_usuario = a.id_usuario1 left join acoes ac on a.id_acao = ac.id_acao where u.id_usuario = ? order by u.id_usuario) and u.id_usuario not in (?)";
        dbmysql.query(sqlSelect, [id_usuario, id_usuario], (err, result) => {
            console.log(result)
            //return res.json(result);

            if (result.length == 0) {
                const sqlSelect2 = "select * from usuarios u inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta where u.id_usuario not in (?)"
                dbmysql.query(sqlSelect2, [id_usuario], (err, result) => {
                    return res.json(result);
                })

            } else { return res.json(result); }

        });

    },

    async NovoUsuario(req, res) {
        const { usuario, celular, nome, sobrenome, email, avatar, bio, id_trabalho, id_conta } = req.body;
        //console.log(usuario, senha, nome, sobrenome, email, avatar, bio, id_trabalho, id_conta);


        const userExist = await database
            .select("usuario").table("usuarios").where({ 'usuario': usuario });

        if (userExist.length) {
            return res.status(400).json({ message: 'Usuario ja existente' })
        }

        await database
            .insert({ usuario, celular, nome, sobrenome, email, avatar, bio, id_trabalho, id_conta }).table("usuarios").then(data => {
                console.log(data)
                res.status(200).json(data)
            }).catch(error => {
                console.log(error)
                res.status(400).json({message:"Erro ao inserir usuario"});
            })

    },

    async UsuarioLogado(req, res) {
        const { id_usuario } = req.headers;

        const sqlSelect = "select * from usuarios u inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta where u.id_usuario = ?"
        dbmysql.query(sqlSelect, id_usuario, (err, result) => {
            console.log(result);
            return res.json(result);
        });
    },

    async UpdateUsuario(req, res){
        const { id_usuario } = req.headers;
        const { usuario,  nome, sobrenome, email, avatar, celular, bio, id_trabalho, id_conta } = req.body;

        console.log(usuario,  nome, sobrenome, email, avatar, celular, bio, id_trabalho, id_conta );
        console.log(id_usuario);
        
        const sqlUpdate = "update usuarios set usuario = ?, celular = ? , nome = ?, sobrenome = ?, email = ?, avatar = ?, bio = ?, id_trabalho = ?, id_conta = ? where id_usuario = ?"
        dbmysql.query(sqlUpdate, [ usuario, celular,  nome, sobrenome, email, avatar, bio, id_trabalho, id_conta, id_usuario], (err, result) => {
            //console.log(result);
            return res.json(result);
        })
    },

    async UsuariosMatch(req, res) {
        const { id_usuario } = req.headers;

        const sqlSelect = "select * from matchs m inner join usuarios u on u.id_usuario = m.id_usuario1 inner join trabalho t on u.id_trabalho = t.id_trabalho inner join tipo_conta c on u.id_conta = c.id_conta where id_usuario2 = ?"
        dbmysql.query(sqlSelect, [id_usuario], (err, result) => {
            console.log(result);
            return res.json(result);
        });
    },

};




