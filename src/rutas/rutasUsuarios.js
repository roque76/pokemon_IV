const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

enrutador.post('/registrar', usuarioControlador.registrarUsuario);
enrutador.get('/listar', usuarioControlador.listarUsuarios);
module.exports = enrutador;