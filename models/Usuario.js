const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
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
      type: Number,
      required: true
    },
    tipoUsuario: {
        // 0 = Admin  1= Conserje
        type: Number, enum: [0, 1],
        required: true
    },
    estadoUsuario: {
        // 0 = Empleado activo  1= Empleado desvinculado
        type: Number, enum: [0, 1],
        required: true
    }

})

module.exports = mongoose.model('Usuario', usuarioSchema)