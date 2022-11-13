const Admin = require('../models/Administrador')

const createAdmin = async (req, res) => {
  	const { nombre, rut } = req.body;

	const newAdmin = new Admin({
		nombre,
		rut
	});

	newAdmin.save((err, admin) => {
		if (err) {
			return res.status(400).send({ message: "Error al guardar" })
		}
			res.status(201).send(admin)
		})


}

const getAdmins = (req, res) => {
	Admin.find({}, (err, admins) => {
		if (err) {
			return res.status(400).send({ message: "Error al listar" })
		}
		res.status(201).send(admins);
	})
}

module.exports = {
  createAdmin,
  getAdmins
}