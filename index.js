require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

var bodyParser = require('body-parser');

const adminRoute = require('./routes/adminRoute')
const conserjeRoute = require('./routes/conserjeRoute')
const turnoRoute = require('./routes/turnoRoute')
const novedadRoute = require('./routes/novedadRoute')

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api/Administrador', adminRoute)
app.use('/api/Conserje', conserjeRoute)
app.use('/api/Turno', turnoRoute)
app.use('/api/Novedad', novedadRoute)

//mongoose.set('useFindAndModify', false);
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);
//mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', true);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT)
})

mongoose.connect(`mongodb://localhost:27017/`, (error) => {
  if(error) console.log(error)
  else {
    console.log("Connected to database")}
})


