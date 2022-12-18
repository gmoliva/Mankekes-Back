const express = require('express');
const api = express.Router();

const mailerController = require('../controllers/mailerController');

//api.post('/justificar/:idUsuario', mailerController.enviarJustificacion);
//api.put('/turnoIO/:idTurno', mailerController.setEntradaSalida);
api.post('/sendMail/:idUsuario', mailerController.sendNotification);

module.exports = api;