const Turno = require('../models/Turno')


const createTurno = (req, res) => {
	const { fecha, tipo, idConserje, entrada, salida } = req.body
	const newTurno = new Turno({
		fecha,
		tipo,
		idConserje,
		entrada,
		salida
	})

	newTurno.save((err, turno) => {
		if (err) return res.status(400).send({ message: err })
		res.status(200).send(turno)
	})

}

const getTurno = (req, res) => {

	Turno.find({}, (err, turno) => {
		if (err) return res.status(400).send({ message: err })
		res.send(turno)
	})

}

const updateTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndUpdate(id, req.body, (err, turno) => {
		if (err) return res.status(400).send({ message: "Error al modificar turno" })
		res.send(turno)
	})
}


const getSpecific = (req, res) => {
    let id = req.params.id
    Turno.findById(id, (err, turno) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(turno);
    })
}



module.exports = {
	createTurno,
	getTurno,
	updateTurno,
	getSpecific
}