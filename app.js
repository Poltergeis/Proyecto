const express = require('express');
const app = express();
const mongoose = require('mongoose');
const citasRouter = require('./rutas/citas');
const usuarioRouter = require('./rutas/usuario');


app.use('/citas', citasRouter);
app.use('/usuario', usuarioRouter);
app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});

mongoose.connect('mongodb://127.0.0.1:27017/Citas', {
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