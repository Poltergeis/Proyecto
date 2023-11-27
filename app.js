const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usuarioRouter = require('./rutas/usuario');
const abogadoRouter = require('./rutas/abogados');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
mongoose.set("strictQuery", false);

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use('/usuario', usuarioRouter);
app.use('/abogado',abogadoRouter);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).send('Error interno del servidor');
});

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error de conexión a MongoDB:\n', error);
  });

  db.once('open', () => {
    console.log('Conexión a MongoDB exitosa');
  });
  
app.listen(process.env.PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${process.env.PORT}`);
});