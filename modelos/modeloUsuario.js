const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    "nombreCliente": String,
    "apellidoCliente": String,
    "numeroTelefono": Number,
    "email": String,
      "motivoCita": String,
    "citaPendiente": Boolean
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuario');