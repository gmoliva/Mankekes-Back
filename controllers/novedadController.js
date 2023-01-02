const Novedad = require('../models/Novedad')
const mailer = require('../controllers/mailerController')

const createNovedad = (req, res) => {
	const { asunto, descripcion, idTurno, idUsuario } = req.body
	const newNovedad = new Novedad({
		tipo: 0,
		asunto,
		descripcion,
		idTurno,
		idUsuario
	})

	newNovedad.save((err, novedad) => {
		if (err) return res.status(400).send({ message: err })
		res.status(200).send(novedad)
	})
}

const getNovedades = (req, res) => {
	Novedad.findById()
		.populate('idTurno')
		.exec((err, novedades) => {
		if (err) return res.status(400).send({ message: err })
		res.send(novedades)
	})
}

const getheNovedades = (req, res) => {
	let id = req.params.idUsuario;
	Novedad.find()
	.where('idUsuario').ne([])
	.where('idUsuario').equals(id)
	.exec(
	(err, result) => {
		if (err) {
			res.status(400).send({
				message: err
			})
		}
		res.status(200).send(result);
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

const updateNovedad = (req, res) => {
	const { id } = req.params;
	Novedad.findByIdAndUpdate(id, req.body, (err, novedad) => {
		if (err) return res.status(400).send({ message: "Error al modificar novedad" })
		res.send(novedad)
	})
}


const deleteNovedad = (req, res) => {
	let id = req.params.id
	Novedad.findByIdAndDelete(id, (err, result) => {
		if (err) {
			res.status(400).send({ message: err })
		}
		res.status(200).send(result)
	}
	)
}

const getOnlyNovedades = (req, res) => {

    Novedad.find()
		.populate('idUsuario')
		.populate('idTurno')
		.exec((err, novedades) => {
        if (err) {
            res.status(400).send({ message: "Error al listar" })
        }
        res.status(200).send(novedades);
        //res.status(200).send({ message: "123"})
    })
}

const enviarJustificacion = (req, res) => {
	let idUsuario = req.params.idUsuario
	
	const { justificacion, idTurno } = req.body
	const newNovedad = new Novedad({
		tipo: 1,
		asunto: "JUSTIFICACION INASISTENCIA",
		descripcion: justificacion,
		idTurno,
		idUsuario
	})
	
	
	newNovedad.save((err, novedad) => {
		if (err) return res.status(400).send({ message: err })
		mailer.enviarJustificacion(req)
		res.status(200).send(novedad)
	})
	
}

const getNovedadesFrom = (req, res) => {
	let id = req.params.idTurno;
	Novedad.find()
	.where('idTurno').ne([])
	.where('idTurno').equals(id)
	.exec(
	(err, result) => {
		if (err) {
			res.status(400).send({
				message: err
			})
		}
		res.status(200).send(result);
	})
}



module.exports = {
	createNovedad,
	getNovedades,
	getheNovedades,
	getNovedad,
	updateNovedad,
	deleteNovedad,
	enviarJustificacion,
	getOnlyNovedades,
	getNovedadesFrom

}

