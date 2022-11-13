const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    rut: {
      type: String,
      required: true,
      unique: true
    },
    nombre: {
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Administrador', adminSchema)