const express = require('express');
const api = express.Router();

const conserjeController = require('../controllers/conserjeController');

api.post('/', conserjeController.createConserje);
api.get('/', conserjeController.getConserjes);
api.get('/:id', conserjeController.getSpecific);

module.exports = api;