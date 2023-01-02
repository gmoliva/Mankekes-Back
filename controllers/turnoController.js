const Turno = require('../models/Turno');
const mailer = require('../controllers/mailerController')

const validateTurno = (req, res) => {

	//console.log("la fecha del nuevo turno es "+ req.body.fecha)
	let id = req.body.idUsuario;
	let nuevoTurno = req.body.fecha;

	Turno.findOne({'fecha': nuevoTurno})
	.where('idUsuario').equals(id)
	.exec((err, turno) => 
	{
		if (err) console.log("err: "+err)

		//console.log(turno)

		if(!turno)
		return validateWeek(req, res);
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

const validateWeek = async (req, res) => {

	const {
		tipo,
		idUsuario,
		horaEntrada,
		horaSalida,
		fecha
	} = req.body;

	// console.log(fecha)
	// let lastWeek = new Date(Date.parse(fecha) - 7 * 60 * 60 * 24 * 1000)
	// console.log("last week day (-7) is " + lastWeek)

	let turnoDate = new Date(Date.parse(fecha))

	let last3days = new Date(turnoDate - 3 * 60 * 60 * 24 * 1000)
	// console.log("last 3 days limit is " + last3days)

	let next3days = new Date(Date.parse(turnoDate) + 3 * 60 * 60 * 24 * 1000)
	// console.log("next 3 days limit is " + next3days)

	let startOfWeek = new Date(turnoDate - turnoDate.getDay() * 60 * 60 * 24 * 1000)
	// console.log("start of week (sunday) is " + startOfWeek)
	
	let endOfWeek = new Date(Date.parse(startOfWeek) + 7 * 60 * 60 * 24 * 1000)
	// console.log("end of week (saturday) is " + endOfWeek)

	let weekCount = 0;
	let daysCount = 0;

	Turno.find()
	.where('idUsuario').equals(idUsuario)
	.exec((err, result) => 
	{
		if (err) console.log("err: "+err)

		result.forEach(turno => {
			if(startOfWeek <= Date.parse(turno.fecha) && endOfWeek >=  Date.parse(turno.fecha))
			weekCount++;

			if(last3days <= Date.parse(turno.fecha) && next3days >=  Date.parse(turno.fecha))
			daysCount++;
		});

		// console.log(result)
		// console.log("turnos this week: " + weekCount)
		// console.log("turnos last 3 days: " + daysCount)

		if(weekCount<3){
			if(daysCount<3)
			return sendTurno(req, res)
			else
			return res.status(202).send({msg: "Conserje no puede tener turnos asignados más de 3 días seguidos."})
		}
		else
		return res.status(202).send({msg: "Conserje ya tiene 3 turnos asignados en la semana seleccionada."})

	})

}

const getTurnoCurrentDate = async (req, res) => {
	
	let currentDate = new Date()

	Turno.find()
	.populate('idUsuario')
	.exec((err, result) => {
		if(err) return console.log(err)
		
		let users = []

		result.forEach(turno => {
			if(Date.parse(turno.fecha.getUTCDate()) === Date.parse(currentDate.getUTCDate()))
			users.push({nombre: turno.idUsuario.nombre, tipo: turno.tipo})			
		});

		if(users[0]?.tipo === 1){
			let temp = users[0]
			users[0] = users.pop()
			users.push(temp)
		}

		return res.status(200).send(users)

	})
}


module.exports = {
	createTurno,
	getTurnos,
	getTurno,
	getTurnoFrom,
	updateTurno,
	deleteTurno,
	setEntradaSalida,
	getTurnoCurrentDate
}