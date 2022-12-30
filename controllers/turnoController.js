const Turno = require('../models/Turno');
const mailer = require('../controllers/mailerController')

const validateTurno = (req, res) => {

	//console.log("la fecha del nuevo turno es "+ req.body.fecha)
	let id = req.body.idUsuario;
	let nuevoTurno = req.body.fecha;

	Turno.find({"fecha": nuevoTurno})
	.where('idUsuario').equals(id)
	.exec(
	(err, turno) => {
		if (err) console.log("err: "+err)

		console.log(turno)

		if(turno)
		return sendTurno(req, res);
		else 
		return res.status(400).send({msg: "existe turno en la misma fecha"})

	})
	
}


const sendTurno = (req, res) => {
	const {
		tipo,
		idUsuario,
		horaEntrada,
		horaSalida,
		fecha
	} = req.body;

	
	const entrada = new Date(Date.parse(`${fecha} ${horaEntrada}:00`));

	const salida = new Date(Date.parse(`${fecha} ${horaSalida}:00`));

	const newTurno = new Turno({
		fecha,
		tipo,
		idUsuario,
		entrada,
		salida
	})

	newTurno.save((err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.status(200).send(turno)
	})

}


const createTurno = (req, res) => {

	validateTurno(req, res);

}

const getTurnos = (req, res) => {
	Turno.find()
		.populate('idUsuario')
		.exec((err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.send(turno)
	})

}

const getTurno = (req, res) => {
	let id = req.params.id;
	Turno.findById(id, (err, turno) => {
		if (err) {
			res.status(400).send({
				message: err
			})
		}
		res.status(200).send(turno);
	})
}

const getTurnoFrom = (req, res) => {
	let id = req.params.id;
	Turno.find({})
	.where('idUsuario').ne([])
	.where('idUsuario').equals(id)
	.exec(
	(err, turno) => {
		if (err) {
			res.status(400).send({
				message: err
			})
		}
		res.status(200).send(turno);
	})
}

const updateTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndUpdate(id, req.body, (err, turno) => {
		if (err) return res.status(400).send({
			message: "Error al modificar turno"
		})
		res.send(turno)
	})
}

const deleteTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndDelete(id, (err, result) => {
		if (err) return res.status(400).send({ message: err })
		res.status(200).send(result)
	})


}

const setEntradaSalida = async (req, res) => {
	let idTurno = req.params.id
	let datetime = new Date();

	if (req.body.entrada) req.body.entrada = datetime;
	if (req.body.salida) req.body.salida = datetime;

	mailer.sendShiftEmail(req)

	Turno.findByIdAndUpdate(idTurno, req.body, (err, turno) => {
		if (err) return res.status(400).send({
			"error": err
		})
		res.status(201).send(turno)
	})
}




module.exports = {
	createTurno,
	getTurnos,
	getTurno,
	getTurnoFrom,
	updateTurno,
	deleteTurno,
	setEntradaSalida
}