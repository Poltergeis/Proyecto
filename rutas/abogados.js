const express = require('express');
const router = express.Router();

const abogadoSchema = new mongoose.Schema({
    "emailCliente": String,
    "abogadoCitado": {
      "nombre": String,
      "apellido": String
    },
    "tituloCita": String,
    "descripcion": String
  });

  const Abogado = mongoose.model('Abogado', abogadoSchema, 'Citas');