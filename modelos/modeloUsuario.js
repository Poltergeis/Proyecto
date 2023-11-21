const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    "nombre": {
      type: String,
      required: true
    },
    "apellido": {
      type: String,
      required: true
    },
    "numeroTelefono": {
      type: String,
      required: false
    },
    "email":  {
      type: String,
      required: true
    },
    "contraseña": {
      type: String,
      required: true
    },
      "tituloCita":  {
        type: String,
        required: false
      }
});

module.exports = mongoose.model('Usuarios', usuarioSchema, 'usuario');