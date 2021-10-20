const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');

const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(router);

server.listen(3030, () => {
    console.log("Aplicação rodando na porta 3030")
});