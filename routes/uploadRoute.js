const express = require('express')
const api = express.Router();

const controller = require('../controllers/uploadController')
/**
 * Ruta: /user GET
 */
api.post(`/`,controller.upload,controller.uploadFile)


module.exports = api;