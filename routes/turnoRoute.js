const express = require('express');
const api = express.Router();

const turnoController = require('../controllers/turnoController');

api.post('/', turnoController.createTurno);
api.get('/', turnoController.getTurnos);
api.get('/:id', turnoController.getTurno);
api.put('/set/:id', turnoController.setEntradaSalida);
api.delete('/:id', turnoController.deleteTurno);
//api.put('/turnoIO/:idTurno', mailerController.setEntradaSalida);


module.exports = api;