const express = require('express');
const api = express.Router();

const novedadController = require('../controllers/novedadController');

api.post('/', novedadController.createNovedad);
api.get('/', novedadController.getNovedades);
//api.put('/:id', reservaController.modificarReserva)

module.exports = api;