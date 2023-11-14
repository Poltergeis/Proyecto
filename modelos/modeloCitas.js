const mongoose = require("mongoose");

const citasSchema = new mongoose.Schema({
    "emailCliente": {
      type: String,
      required: true
    },
    "Telefono":{
      type: String,
      required: true
    },
    "tituloCita": {
      type: String,
      required: true
    },
    "descripcion": {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Citas', citasSchema, 'Citas');