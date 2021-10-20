const connection = require('../database/connection');
const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
const AcaoController = require('../controllers/AcaoController');
const LoginController = require('../controllers/LoginController');
const CadastroController = require('../controllers/CadastroController');


router.get('/usuarios', UserController.ListarUsuarios);
router.get('/usuariologado', UserController.UsuarioLogado);
router.post('/novoUsuario', UserController.NovoUsuario);
router.put('/perfil', UserController.UpdateUsuario);
router.get('/matchusuarios', UserController.UsuariosMatch);

router.post('/usuarios/:id_usuario2/acao', AcaoController.acao);

router.post('/login', LoginController.Login);

router.get('/trabalho', CadastroController.Trabalhos);
router.get('/tipoconta', CadastroController.conta);

module.exports = router;