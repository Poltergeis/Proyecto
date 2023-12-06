const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    "nombre": {
      type: String,
      required: true,
      validate: (nombre) => {
        const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
        return regex.test(nombre);
      }
    },
    "tipoUsuario": {
      type: String,
      required: true,
      validate: (tipo) => {
        const usuariosValidos = ["admin","cliente"];
        return usuariosValidos.includes(tipo);
      }
    },
    "numeroTelefono": {
      type: String,
      required: false,
      validate: (telefono) => {
        const regex = /^[0-9]+$/;
        return regex.test(telefono);
      }
    },
    "email":  {
      type: String,
      required: true,
      validate: (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
      }
    },
    "contraseña": {
      type: String,
      required: true,
      validate: (psw) => {
        const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
        return regex.test(psw);
      }
    },
    "tituloCita":  {
      type: String,
      required: false,
      validate: (titulo) => {
        const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
        return regex.test(titulo);
      },
      max: 100
    },
    "descripcionCita": {
      type: String,
      required: false,
      validate: (desc) => {
        const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
        return regex.test(desc);
      }
    }
});

module.exports = mongoose.model('Usuarios', usuarioSchema, 'usuario');