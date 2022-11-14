const mongoose = require('mongoose')
const { Schema, model } = mongoose

const novedadSchema = new Schema({
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
	}

})

module.exports = model('Novedad', novedadSchema)