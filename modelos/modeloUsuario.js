const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    "nombre": {
      type: String,
      required: true,
      validate: () => {
        const nombre = this.nombre;
        const regex = /^[a-zA-Z]+$/;
        return regex.test(nombre);
      }
    },
    "tipoUsuario": {
      type: String,
      required: true,
      validate: () => {
        const tipo = this.tipoUsuario;
        const usuariosValidos = ["admin","cliente"];
        return usuariosValidos.includes(tipo);
      }
    },
    "numeroTelefono": {
      type: String,
      required: false,
      validate: () => {
        const telefono = this.numeroTelefono;
        const regex = /^[0-9]+$/;
        return regex.test(telefono);
      }
    },
    "email":  {
      type: String,
      required: true,
      validate: () => {
        const email = this.email;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
      }
    },
    "contraseña": {
      type: String,
      required: true
    },
    "tituloCita":  {
      type: String,
      required: false,
      validate: () => {
        const titulo = this.tituloCita;
        const regex = /^[a-zA-Z]+$/;
        return regex.test(titulo);
      },
      max: 100
    },
    "descripcionCita": {
      type: String,
      required: false,
      validate: () => {
        const desc = this.descripcionCita;
        const regex = /^[a-zA-Z]+$/;
        return regex.test(desc);
      }
    }
});

module.exports = mongoose.model('Usuarios', usuarioSchema, 'usuario');