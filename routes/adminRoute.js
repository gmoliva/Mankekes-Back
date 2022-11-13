const express = require('express');
const api = express.Router();

const adminController = require('../controllers/adminController');

api.post('/', adminController.createAdmin);
api.get('/', adminController.getAdmins);


module.exports = api;