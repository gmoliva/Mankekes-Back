const express = require('express');
const api = express.Router();

const novedadController = require('../controllers/novedadController');

api.post('/', novedadController.createNovedad);
api.get('/search/', novedadController.getNovedades);
api.get('/search/:idUsuario', novedadController.getheNovedades);
api.get('/:id', novedadController.getNovedad);
api.put('/:id', novedadController.updateNovedad);
api.delete('/:id', novedadController.deleteNovedad);
api.post('/justificar/:idUsuario', novedadController.enviarJustificacion);
api.get('/sn/search',novedadController.getOnlyNovedades);
api.get('/getFromNov/:idTurno', novedadController.getNovedadesFrom);

module.exports = api;