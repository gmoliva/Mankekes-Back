require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  keepAlive: true,
  //connectTimeoutMS: 10000,
  //socketTimeoutMS: 45000,
  family: 4,
  useUnifiedTopology: true
}

const turnoRoute = require('./routes/turnoRoute')
const novedadRoute = require('./routes/novedadRoute')
const usuarioRoute = require('./routes/usuarioRoute')
const uploadRoute = require('./routes/uploadRoute')
const mailerRoute = require('./routes/mailerRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api/Turno', turnoRoute)
app.use('/api/Novedad', novedadRoute)
app.use('/api/Usuario', usuarioRoute)
app.use('/api/Upload', uploadRoute)
app.use('/api/mailer', mailerRoute)

mongoose.connect(process.env.URI, options, (error) => {
  if (error) console.log(error)
  else {
    console.log("Connected to database")
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server running on PORT " + process.env.PORT)
})