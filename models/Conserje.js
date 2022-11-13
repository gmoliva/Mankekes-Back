const mongoose = require('mongoose')

const conserjeSchema = mongoose.Schema({
    rut: {
      type: String,
      required: true,
      unique: true
    },
    nombre: {
      type: String,
      required: true
    },
    domicilio: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    numero: {
      type: Number
    }

})

module.exports = mongoose.model('Conserje', conserjeSchema)