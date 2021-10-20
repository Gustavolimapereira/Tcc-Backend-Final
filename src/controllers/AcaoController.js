const database = require('../database/connection');

module.exports = {
    async acao(req, res) {


        const { id_usuario1 } = req.headers;
        const { id_acao } = req.body;
        const { id_usuario2 } = req.params;

        console.log(id_usuario1, id_acao, id_usuario2);

        const usuarioAlvo = await database.select("*").table("usuarios").where({ 'id_usuario': id_usuario2 });

        if (usuarioAlvo.length == 0) {
            return res.status(400).json({ message: "Usuario não existe" })
        }

        await database
            .insert({ id_usuario1, id_acao, id_usuario2 }).table("registra_acao").then(data => {
                console.log("Registro de ação adicionado com sucesso no banco de dados")
                //res.status(200).json({ message: "Registro adicionado com sucesso no banco de dados" });
            });
        const verificaAcao = await
            database.select("*").table("registra_acao").where({ 'id_usuario1': id_usuario1, 'id_usuario2': id_usuario2, 'id_acao': 1 })
                .union([
                    database.select("*").table("registra_acao").where({ 'id_usuario1': id_usuario2, 'id_usuario2': id_usuario1, 'id_acao': 1 })
                ]);

        if (verificaAcao.length >= 2) {
            console.log('Deu Match');
            return res.status(200).json({ message: 'Deu Match' })
        } return res.json();

    }
};