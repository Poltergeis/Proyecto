const mongoose = require("mongoose");

const citasSchema = new mongoose.Schema({
    "emailCliente": String,
    "abogadoCitado": {
      "nombre": String,
      "apellido": String
    },
    "tituloCita": String,
    "descripcion": String
});

module.exports = mongoose.model('Citas', citasSchema, 'Citas');