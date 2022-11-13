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
	idConserje: {
		type: Schema.Types.ObjectId,
		ref: 'Conserje'
	},
	entrada: {type: String},
	salida: {type: String}
	

})

turnoSchema.index({fecha: 1, tipo: 1}, { unique: true });

module.exports = model('Turno', turnoSchema)