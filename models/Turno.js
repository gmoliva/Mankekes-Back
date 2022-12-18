const mongoose = require('mongoose')
const { Schema, model } = mongoose

const turnoSchema = new Schema({
	fecha: {
		type: Date,
		required: true
	},
	tipo: {
		type: Number, enum: [0, 1],
		required: true
	},
	idUsuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
	entrada: {type: Date},
	salida: {type: Date}
	

})

turnoSchema.index({fecha: 1, tipo: 1}, { unique: true });

module.exports = model('Turno', turnoSchema)