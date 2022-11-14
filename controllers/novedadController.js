const Novedad = require('../models/Novedad')

const createNovedad = (req, res) => {
	const { asunto, descripcion, idTurno } = req.body
	const newNovedad = new Novedad({
		asunto,
		descripcion,
		idTurno

	})

	newNovedad.save((err, especialista) => {
		if (err) return res.status(400).send({ message: "error guardando" })
		res.status(200).send(especialista)
	})
}

const getNovedades = (req, res) => {
	Novedad.find({}, (err, novedades) => {
		if (err) return res.status(400).send({ message: "error listando" })
		res.send(novedades)
	})
}

const updateNovedad = (req, res) => {
	const { id } = req.params;
	Novedad.findByIdAndUpdate(id, req.body, (err, novedad) => {
		if (err) return res.status(400).send({ message: "Error al modificar novedad" })
		res.send(novedad)
	})
}

const getNovedad = (req, res) => {
    let id = req.params.id
    Novedad.findById(id, (err, novedad) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(novedad);
    })
}


module.exports = {
	createNovedad,
	getNovedades,
	updateNovedad,
	getNovedad
}

