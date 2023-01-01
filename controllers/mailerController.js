const nodemailer = require("nodemailer");

const Usuario = require('../models/Usuario');
const Turno = require('../models/Turno');
//const Novedad = require('../models/Novedad');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.ADDR, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
    },
});

const sendEmail = async (request, email) => {

    if (request.body.entrada) {
        title = "Notificacion de entrada"
        content = "Conserje ha entrado."
    } else
    if (request.body.salida) {
        title = "Notificacion de salida"
        content = "Conserje se ha retirado."
    } else
    if (request.body.asunto && request.body.descripcion) {
        title = "Nueva novedad: " + request.body.asunto
        content = "" + request.body.descripcion
    } else
    if (request.body.asunto && request.body.justificacion) {
        title = "Conserje no puede asistir a su turno"
        content = request.body.justificacion
    } else return console.log("no se ha encontrado ningun parametro por el que enviar correo")
    // let directory = mail

    const msg = {
        from: '"Mankekes Platform" <noreply@mankekesIECI.com>', // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        text: content, // plain text body
        //  html: "<b>Hello world?</b>", // html body
    }

    const info = await transporter.sendMail(msg);

    // if (info.messageId) return console.log("mail sent")
    // else return console.log("mail could not be sent")
}

const sendCustomEmail = async (email, message) => {

    const msg = {
        from: '"Mankekes Platform" <noreply@mankekesIECI.com>', // sender address
        to: email, // list of receivers
        subject: "Notificación de Administrador", // Subject line
        text: message, // plain text body
        //  html: "<b>Hello world?</b>", // html body
    }

    const info = await transporter.sendMail(msg);

}

const enviarJustificacion = (req) => {

    req.body.idUsuario = ""
    Turno.findByIdAndUpdate(req.body.idTurno, req.body.idUsuario);

    Turno.findById(req.body.idTurno).select('email').populate('idUsuario').exec((err, user) => {
        sendEmail(req, user.idUsuario.email)
    })

}


const sendShiftEmail = (req) => {

    Turno.findById(req.params.id)
        .select('email')
        .populate('idUsuario')
        .exec((err, result) => {

            sendEmail(req, result.idUsuario.email)
        })

}

const sendNotification = (req, res) => {
    let idUsuario = req.params.idUsuario

    Usuario.findOne({_id: idUsuario}, (err, user) => {
        if (err) res.status(400).send({
            msg: err
        })
        //console.log(req.body.email + "    " + req.body.message)
        //console.log(user.tipoUsuario)

        if (user.tipoUsuario == 0) {
            sendCustomEmail(user.email, req.body.message)
            return res.status(202).send({
                msg: "mail ha sido enviado correctamente"
            })

        }
        return res.status(200).send({
            msg: "mail no se ha podido enviar"
        })
    })
}

module.exports = {
    enviarJustificacion,
    sendShiftEmail,
    sendNotification

}