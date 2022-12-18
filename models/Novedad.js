const mongoose = require('mongoose')
const { Schema, model } = mongoose

const novedadSchema = new Schema({
	tipo: {
		// 0 = NOVEDAD			1 = JUSTIFICACION
		type: Number, enum: [0, 1],
		required: true
	},
	asunto: {
    	type: String,
    	required: true
  	},
	descripcion: {
		type: String
	},
	idTurno: {
		type: Schema.Types.ObjectId,
		ref: 'Turno',
		required: true
	},
	idUsuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	}

})

module.exports = model('Novedad', novedadSchema)