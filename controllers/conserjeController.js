const Conserje = require('../models/Conserje')

// CREACION DE NUEVO CONSERJE
const createConserje = async (req, res) => {
  	const { rut, nombre, domicilio, email, body } = req.body;	  
	const newConserje = new Conserje({
		rut,
		nombre,
		domicilio,
		email, 
		body 
	});

	newConserje.save((err, conserje) => {
		if (err){	
			return res.status(400).send({ message: "Error al guardar" })
		}

		res.status(200).send(conserje)
	})

}

// OBTENER LISTA DE CONSERJES
const getConserjes = (req, res) => {

	Conserje.find({}, (err, conserjes) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(conserjes);
	})
}

// OBTENER UN CONSERJE ESPECIFICO
const getSpecific = (req, res) => {
    let id = req.params.id
    Conserje.findById(id, (err, conserjes) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(conserjes);
    })
}

module.exports = {
  createConserje,
  getConserjes,
  getSpecific
}